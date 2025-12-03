import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import fs from "fs/promises"
import path from "path"

const DATABASE_URL = process.env.DATABASE_URL
const isValidDatabaseUrl = DATABASE_URL && DATABASE_URL.startsWith('postgresql://')

if (!isValidDatabaseUrl) {
  console.warn("Warning: DATABASE_URL is not configured — waitlist API will use local fallback in dev")
}

const sql = isValidDatabaseUrl ? neon(DATABASE_URL) : null

// Simple rate limiting (in-memory, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5 // Max 5 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Send welcome email via Plunk
async function sendWelcomeEmail(email: string, name: string | null) {
  try {
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 560px; margin: 40px auto; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    
    <!-- Header with Logo -->
    <div style="text-align: center; padding: 40px 40px 20px;">
      <img src="https://trendzap.xyz/trendzap_logo.png" alt="TrendZap" style="height: 48px; margin-bottom: 16px;" />
      <h1 style="margin: 0; font-size: 24px; color: #111827; font-weight: 600;">Welcome to TrendZap!</h1>
    </div>

    <!-- Content -->
    <div style="padding: 0 40px 40px;">
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
        Hi${name ? ` ${name}` : ''},
      </p>
      
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
        You're on the waitlist! We're building a prediction marketplace where you can turn your social media insights into real rewards.
      </p>

      <!-- Features -->
      <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <div style="display: flex; align-items: start; margin-bottom: 12px;">
          <span style="font-size: 20px; margin-right: 12px;">⚡</span>
          <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.5;">
            <strong>Copy & Predict</strong> — Paste any TikTok, Instagram, YouTube, or X link
          </p>
        </div>
        <div style="display: flex; align-items: start; margin-bottom: 12px;">
          <span style="font-size: 20px; margin-right: 12px;">🏆</span>
          <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.5;">
            <strong>Win Tokens</strong> — Earn TREND tokens for accurate predictions
          </p>
        </div>
        <div style="display: flex; align-items: start;">
          <span style="font-size: 20px; margin-right: 12px;">📊</span>
          <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.5;">
            <strong>Compete</strong> — Join leaderboards and win monthly rewards
          </p>
        </div>
      </div>

      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
        We're launching in mid-December 2025. You'll be among the first to get access.
      </p>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 24px;">
        <a href="https://trendzap.xyz/roadmap" style="display: inline-block; background: linear-gradient(90deg, #a855f7, #38bdf8); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
          View Roadmap
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #e5e7eb; padding: 24px 40px; text-align: center;">
      <p style="margin: 0 0 8px; color: #9ca3af; font-size: 13px;">
        © 2025 TrendZap. All rights reserved.
      </p>
      <p style="margin: 0; color: #d1d5db; font-size: 12px;">
        You're receiving this because you joined our waitlist at trendzap.xyz
      </p>
    </div>

  </div>
</body>
</html>
    `

    await fetch('https://api.useplunk.com/v1/send', {
      method: 'POST',
      body: JSON.stringify({
        to: email,
        subject: "Welcome to TrendZap Waitlist 🎉",
        body: emailBody
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk_35a8ab005afae4b6f718909d28d42d69e8f815b19f995ac6',
      },
    })
  } catch (error) {
    console.error('Error sending welcome email:', error)
    // Don't throw - we don't want to fail the waitlist signup if email fails
  }
}

async function ensureTable() {
  if (!sql) return
  await sql`CREATE TABLE IF NOT EXISTS waitlist_submissions (
    id serial PRIMARY KEY,
    name text,
    email text UNIQUE NOT NULL,
    platform text,
    created_at timestamptz DEFAULT now()
  )`
}

const DATA_DIR = path.resolve(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "waitlist.json")

async function readLocal() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8")
    return JSON.parse(raw)
  } catch (e: any) {
    if (e.code === "ENOENT") return []
    console.error("readLocal error", e)
    return []
  }
}

async function writeLocal(rows: any[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(rows, null, 2), "utf8")
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const body = await req.json()
    const email = body?.email?.toString()?.trim()?.toLowerCase()
    
    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }
    
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Sanitize name and platform
    const name = body.name?.toString()?.trim()?.slice(0, 100) || null
    const platform = body.platform?.toString()?.trim()?.slice(0, 100) || null

    // If we have a real DB, use it
    if (sql) {
      try {
        await ensureTable()
        const res = await sql`
          INSERT INTO waitlist_submissions (name, email, platform, created_at)
          VALUES (${name}, ${email}, ${platform}, ${body.createdAt ?? new Date().toISOString()})
          ON CONFLICT (email) DO UPDATE SET 
            name = COALESCE(EXCLUDED.name, waitlist_submissions.name),
            platform = COALESCE(EXCLUDED.platform, waitlist_submissions.platform)
          RETURNING id, email, created_at
        `
        
        // Send welcome email (async, don't wait)
        sendWelcomeEmail(email, name).catch(err => 
          console.error('Failed to send welcome email:', err)
        )
        
        return NextResponse.json({ 
          success: true, 
          message: "Successfully joined the waitlist! Check your email.",
          data: res[0] 
        }, { status: 200 })
      } catch (dbErr: any) {
        console.error("/api/waitlist DB error", dbErr)
        return NextResponse.json({ 
          error: "Database error. Please try again later." 
        }, { status: 500 })
      }
    }

    // Fallback: local filesystem storage (development only)
    try {
      const rows = await readLocal()
      // upsert by email
      const existingIndex = rows.findIndex((r: any) => String(r.email).toLowerCase() === email)
      const item = {
        id: rows.length ? Math.max(...rows.map((r: any) => r.id || 0)) + 1 : 1,
        name,
        email,
        platform,
        created_at: body.createdAt ?? new Date().toISOString(),
      }
      if (existingIndex > -1) {
        // preserve original id, update fields
        item.id = rows[existingIndex].id ?? item.id
        rows[existingIndex] = { ...rows[existingIndex], ...item }
      } else {
        rows.push(item)
      }
      await writeLocal(rows)
      
      // Send welcome email (async, don't wait)
      sendWelcomeEmail(email, name).catch(err => 
        console.error('Failed to send welcome email:', err)
      )
      
      return NextResponse.json({ 
        success: true, 
        message: "Successfully joined the waitlist! Check your email.",
        data: item 
      }, { status: 200 })
    } catch (fsErr) {
      console.error("/api/waitlist local fallback error", fsErr)
      return NextResponse.json({ 
        error: "Unable to process your request. Please try again." 
      }, { status: 500 })
    }
  } catch (err: any) {
    console.error("/api/waitlist error", err)
    return NextResponse.json({ 
      error: "An unexpected error occurred. Please try again." 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (sql) {
      await ensureTable()
      const rows = await sql`SELECT id, name, email, platform, created_at FROM waitlist_submissions ORDER BY created_at DESC LIMIT 1000`
      return NextResponse.json(rows)
    }

    // local fallback
    const rows = await readLocal()
    // return most recent first
    rows.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    return NextResponse.json(rows.slice(0, 1000))
  } catch (e) {
    console.error("/api/waitlist GET error", e)
    return NextResponse.json([], { status: 200 })
  }
}
