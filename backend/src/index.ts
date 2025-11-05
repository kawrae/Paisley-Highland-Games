import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { z } from "zod";
import db from "./db";
import { requireAdmin } from "./auth";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 4000);

// -------------------------
// Auth
// -------------------------
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email/password" });
    }

    const row = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email) as any;
    if (!row || !row.password_hash) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = bcrypt.compareSync(password, row.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET missing");
      return res.status(500).json({ error: "Server misconfigured" });
    }

    const token = jwt.sign(
      { id: row.id, email: row.email, role: row.role },
      secret,
      { expiresIn: "12h" }
    );

    res.json({ token, user: { email: row.email, role: row.role } });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ error: "Auth failed" });
  }
});

// -------------------------
// Events
// -------------------------
app.get("/api/events", (_req, res) => {
  const rows = db.prepare(`SELECT id as _id, name FROM events ORDER BY name`).all();
  res.json(rows);
});

// -------------------------
// Results
// -------------------------
app.get("/api/results", (_req, res) => {
  const rows = db
    .prepare(
      `
      SELECT id as _id, athlete, club, event_id as eventId, event_name as eventName,
             position, score, date
      FROM results
      ORDER BY date DESC, position ASC
    `
    )
    .all();
  res.json(rows);
});

const resultSchema = z.object({
  athlete: z.string().min(1),
  club: z.string().optional(),
  eventId: z.string().min(1),
  eventName: z.string().min(1),
  position: z.number().int().min(1),
  score: z.number(),
  date: z.string().min(1),
});

app.post("/api/registrations", (req, res) => {
  const parsed = registrationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload", issues: parsed.error.issues });

  const event = db.prepare("SELECT id FROM events WHERE id = ?").get(parsed.data.eventId);
  if (!event) return res.status(400).json({ error: "Unknown event" });

  const id = crypto.randomUUID();
  db.prepare(`
    INSERT INTO registrations (id, first_name, last_name, email, event_id, created_at, status)
    VALUES (?, ?, ?, ?, ?, ?, 'pending')
  `).run(
    id,
    parsed.data.firstName.trim(),
    parsed.data.lastName.trim(),
    parsed.data.email.trim(),
    parsed.data.eventId,
    new Date().toISOString()
  );

  res.status(201).json({ id });
});

app.delete("/api/results/:id", requireAdmin, (req, res) => {
  db.prepare(`DELETE FROM results WHERE id = ?`).run(req.params.id);
  res.json({ ok: true });
});

// -------------------------
// Registrations
// -------------------------
const registrationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  eventId: z.string().min(1),
});

app.post("/api/registrations", (req, res) => {
  const parsed = registrationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", issues: parsed.error.issues });
  }

  // ensure event exists (defensive)
  const event = db.prepare("SELECT id FROM events WHERE id = ?").get(parsed.data.eventId);
  if (!event) return res.status(400).json({ error: "Unknown event" });

  const id = crypto.randomUUID();

  try {
    db.prepare(
      `
      INSERT INTO registrations (id, first_name, last_name, email, event_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    ).run(
      id,
      parsed.data.firstName.trim(),
      parsed.data.lastName.trim(),
      parsed.data.email.trim(),
      parsed.data.eventId,
      new Date().toISOString()
    );

    return res.status(201).json({ _id: id });
  } catch (e: any) {
    // If you add a UNIQUE(email,event_id) constraint, you might catch duplicates here
    return res.status(500).json({ error: "Failed to save registration" });
  }
});

app.get("/api/registrations", requireAdmin, (_req, res) => {
  const rows = db.prepare(`
    SELECT r.id,
           r.first_name  AS firstName,
           r.last_name   AS lastName,
           r.email,
           r.event_id    AS eventId,
           e.name        AS eventName,
           r.status,
           r.created_at  AS createdAt
    FROM registrations r
    JOIN events e ON e.id = r.event_id
    ORDER BY r.created_at DESC
  `).all();
  res.json(rows);
});

app.patch("/api/registrations/:id", requireAdmin, (req, res) => {
  const { status } = req.body || {};
  if (!["pending", "approved", "rejected"].includes(status))
    return res.status(400).json({ error: "Bad status" });

  const info = db.prepare(`UPDATE registrations SET status = ? WHERE id = ?`).run(status, req.params.id);
  res.json({ ok: true, updated: info.changes });
});

app.delete("/api/registrations/:id", requireAdmin, (req, res) => {
  const info = db.prepare(`DELETE FROM registrations WHERE id = ?`).run(req.params.id);
  res.json({ ok: true, deleted: info.changes });
});

// -------------------------
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
