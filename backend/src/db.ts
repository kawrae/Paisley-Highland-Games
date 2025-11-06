import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const db = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export async function init() {
  await db.execute(`PRAGMA foreign_keys = ON;`);

  await db.execute(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','user'))
);
`);

  await db.execute(`
CREATE TABLE IF NOT EXISTS events (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL
);
`);

  await db.execute(`
CREATE TABLE IF NOT EXISTS results (
  id         TEXT PRIMARY KEY,
  athlete    TEXT NOT NULL,
  club       TEXT,
  event_id   TEXT NOT NULL,
  event_name TEXT NOT NULL,
  position   INTEGER NOT NULL,
  score      REAL NOT NULL,
  date       TEXT NOT NULL,
  FOREIGN KEY(event_id) REFERENCES events(id)
);
`);

  await db.execute(`
CREATE TABLE IF NOT EXISTS registrations (
  id         TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL,
  event_id   TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at TEXT NOT NULL,
  FOREIGN KEY(event_id) REFERENCES events(id)
);
`);

  await db.execute(`CREATE UNIQUE INDEX IF NOT EXISTS uq_reg_email_event ON registrations(email, event_id);`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_results_event ON results(event_id);`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_results_date  ON results(date);`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_reg_created   ON registrations(created_at);`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_reg_status    ON registrations(status);`);

  const adminEmail = process.env.ADMIN_EMAIL || "admin@phg.local";
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  const hash = bcrypt.hashSync(adminPass, 10);

  const existing = await db.execute({
    sql: "SELECT id FROM users WHERE email = ?",
    args: [adminEmail],
  });
  if (existing.rows.length) {
    await db.execute({
      sql: "UPDATE users SET password_hash = ?, role = 'admin' WHERE email = ?",
      args: [hash, adminEmail],
    });
  } else {
    await db.execute({
      sql: "INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'admin')",
      args: [adminEmail, hash],
    });
  }

  const cnt = await db.execute("SELECT count(*) as c FROM events");
  const c = Number((cnt.rows[0] as any).c ?? 0);
  if (!c) {
    await db.execute({ sql: "INSERT INTO events (id, name) VALUES (?, ?)", args: ["caber", "Caber Toss"] });
    await db.execute({ sql: "INSERT INTO events (id, name) VALUES (?, ?)", args: ["tug", "Tug o’ War"] });
    await db.execute({ sql: "INSERT INTO events (id, name) VALUES (?, ?)", args: ["stone", "Stone Put"] });
  }
}

export default db;
