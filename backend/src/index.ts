import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { z } from "zod";
import db, { init } from "./db";
import { requireAdmin } from "./auth";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 4000);

app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "Missing email/password" });

    const rows = await db.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    });
    const row = rows.rows[0] as any;
    if (!row || !row.password_hash)
      return res.status(401).json({ error: "Invalid credentials" });

    const ok = bcrypt.compareSync(password, row.password_hash as string);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ error: "Server misconfigured" });

    const token = jwt.sign(
      { id: row.id, email: row.email, role: row.role },
      secret,
      { expiresIn: "12h" }
    );
    res.json({ token, user: { email: row.email, role: row.role } });
  } catch {
    res.status(500).json({ error: "Auth failed" });
  }
});

app.get("/api/events", async (_req: Request, res: Response) => {
  const r = await db.execute(
    "SELECT id as _id, name FROM events ORDER BY name"
  );
  res.json(r.rows);
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

app.get("/api/results", async (_req: Request, res: Response) => {
  const r = await db.execute(`
    SELECT id as _id, athlete, club, event_id as eventId, event_name as eventName,
           position, score, date
    FROM results
    ORDER BY date DESC, position ASC
  `);
  res.json(r.rows);
});

app.delete(
  "/api/results/:id",
  requireAdmin,
  async (req: Request, res: Response) => {
    await db.execute({
      sql: "DELETE FROM results WHERE id = ?",
      args: [req.params.id],
    });
    res.json({ ok: true });
  }
);

const registrationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  eventId: z.string().min(1),
});

app.post("/api/registrations", async (req: Request, res: Response) => {
  const parsed = registrationSchema.safeParse(req.body);
  if (!parsed.success)
    return res
      .status(400)
      .json({ error: "Invalid payload", issues: parsed.error.issues });

  const ev = await db.execute({
    sql: "SELECT id FROM events WHERE id = ?",
    args: [parsed.data.eventId],
  });
  if (!ev.rows.length) return res.status(400).json({ error: "Unknown event" });

  const id = crypto.randomUUID();
  try {
    await db.execute({
      sql: `
        INSERT INTO registrations (id, first_name, last_name, email, event_id, created_at, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')
      `,
      args: [
        id,
        parsed.data.firstName.trim(),
        parsed.data.lastName.trim(),
        parsed.data.email.trim(),
        parsed.data.eventId,
        new Date().toISOString(),
      ],
    });
    return res.status(201).json({ _id: id });
  } catch {
    return res.status(500).json({ error: "Failed to save registration" });
  }
});

app.get(
  "/api/registrations",
  requireAdmin,
  async (_req: Request, res: Response) => {
    const r = await db.execute(`
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
  `);
    res.json(r.rows);
  }
);

app.patch(
  "/api/registrations/:id",
  requireAdmin,
  async (req: Request, res: Response) => {
    const { status } = req.body || {};
    if (!["pending", "approved", "rejected"].includes(status))
      return res.status(400).json({ error: "Bad status" });

    const r = await db.execute({
      sql: "UPDATE registrations SET status = ? WHERE id = ?",
      args: [status, req.params.id],
    });
    res.json({ ok: true, updated: r.rowsAffected ?? 0 });
  }
);

app.delete(
  "/api/registrations/:id",
  requireAdmin,
  async (req: Request, res: Response) => {
    const r = await db.execute({
      sql: "DELETE FROM registrations WHERE id = ?",
      args: [req.params.id],
    });
    res.json({ ok: true, deleted: r.rowsAffected ?? 0 });
  }
);

init().then(() => {
  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
});
