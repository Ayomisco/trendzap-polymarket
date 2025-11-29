import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import fs from "fs/promises"
import path from "path"

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.warn("Warning: process.env.DATABASE_URL is not set — waitlist API will use local fallback in dev")
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
    const body = await req.json()
    const email = body?.email?.toString()?.trim()
    if (!email) {
      return NextResponse.json({ error: "email required" }, { status: 400 })
    }

    // If we have a real DB, use it
    if (sql) {
      try {
        await ensureTable()
        const res = await sql`
          INSERT INTO waitlist_submissions (name, email, platform, created_at)
          VALUES (${body.name ?? null}, ${email}, ${body.platform ?? null}, ${body.createdAt ?? new Date().toISOString()})
          ON CONFLICT (email) DO UPDATE SET name = COALESCE(EXCLUDED.name, waitlist_submissions.name)
          RETURNING id, email, created_at
        `
        return NextResponse.json({ ok: true, inserted: res })
      } catch (dbErr) {
        console.error("/api/waitlist DB error", dbErr)
        return NextResponse.json({ error: "db error" }, { status: 500 })
      }
    }

    // Fallback: local filesystem storage (development only)
    try {
      const rows = await readLocal()
      // upsert by email
      const existingIndex = rows.findIndex((r: any) => String(r.email).toLowerCase() === String(email).toLowerCase())
      const item = {
        id: rows.length ? Math.max(...rows.map((r: any) => r.id || 0)) + 1 : 1,
        name: body.name ?? null,
        email,
        platform: body.platform ?? null,
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
      return NextResponse.json({ ok: true, inserted: item })
    } catch (fsErr) {
      console.error("/api/waitlist local fallback error", fsErr)
      return NextResponse.json({ error: "internal" }, { status: 500 })
    }
  } catch (err) {
    console.error("/api/waitlist error", err)
    return NextResponse.json({ error: "internal" }, { status: 500 })
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
