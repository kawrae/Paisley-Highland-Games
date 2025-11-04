import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import db from "./db";
import { requireAdmin } from "./auth";

dotenv.config();

const app = express();

// CORS for local dev; adjust FRONTEND_ORIGIN in .env if needed
const ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

const PORT = Number(process.env.PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// ---- Auth (shared handler) ----
function loginHandler(req: express.Request, res: express.Response) {
  const body = req.body || {};
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email/password" });
  }

  // email-insensitive match
  const row = db
    .prepare(
      `SELECT id, email, password_hash, role
       FROM users
       WHERE lower(email) = lower(?)`
    )
    .get(email) as { id: number; email: string; password_hash: string; role: string } | undefined;

  if (!row) return res.status(401).json({ error: "Invalid credentials" });

  const ok = bcrypt.compareSync(password, row.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: row.id, email: row.email, role: row.role },
    JWT_SECRET,
    { expiresIn: "12h" }
  );

  // If you want to use cookies instead, uncomment:
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   sameSite: "lax",
  //   maxAge: 12 * 60 * 60 * 1000,
  // });

  return res.json({ token, user: { email: row.email, role: row.role } });
}

// Support both paths to avoid front/back mismatch
app.post("/api/auth/login", loginHandler);
app.post("/api/login", loginHandler);

// ---- Events ----
app.get("/api/events", (_req, res) => {
  const rows = db
    .prepare(`SELECT id as _id, name FROM events ORDER BY name`)
    .all();
  res.json(rows);
});

// ---- Results ----
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

// admin only
app.post("/api/results", requireAdmin, (req, res) => {
  const parsed = resultSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Invalid payload", issues: parsed.error.issues });
  }

  const id = randomUUID();
  const r = parsed.data;

  db.prepare(
    `
    INSERT INTO results (id, athlete, club, event_id, event_name, position, score, date)
    VALUES (@id, @athlete, @club, @eventId, @eventName, @position, @score, @date)
  `
  ).run({ id, ...r });

  res.status(201).json({ _id: id, ...r });
});

// admin only
app.delete("/api/results/:id", requireAdmin, (req, res) => {
  db.prepare(`DELETE FROM results WHERE id = ?`).run(req.params.id);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
