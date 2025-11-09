import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.warn("Warning: process.env.DATABASE_URL is not set — waitlist API will fail until configured")
}

const sql = DATABASE_URL ? neon(DATABASE_URL) : null

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

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = body?.email?.toString()?.trim()
    if (!email) {
      return NextResponse.json({ error: "email required" }, { status: 400 })
    }

    if (!sql) {
      console.error("No DATABASE_URL configured")
      return NextResponse.json({ error: "server misconfigured" }, { status: 500 })
    }

    await ensureTable()

    // insert, ignore conflicts on email
    const res = await sql`
      INSERT INTO waitlist_submissions (name, email, platform, created_at)
      VALUES (${body.name ?? null}, ${email}, ${body.platform ?? null}, ${body.createdAt ?? new Date().toISOString()})
      ON CONFLICT (email) DO UPDATE SET name = COALESCE(EXCLUDED.name, waitlist_submissions.name)
      RETURNING id, email, created_at
    `

    return NextResponse.json({ ok: true, inserted: res })
  } catch (err) {
    console.error("/api/waitlist error", err)
    return NextResponse.json({ error: "internal" }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!sql) return NextResponse.json([], { status: 200 })
    await ensureTable()
    const rows = await sql`SELECT id, name, email, platform, created_at FROM waitlist_submissions ORDER BY created_at DESC LIMIT 1000`
    return NextResponse.json(rows)
  } catch (e) {
    console.error("/api/waitlist GET error", e)
    return NextResponse.json([], { status: 200 })
  }
}
