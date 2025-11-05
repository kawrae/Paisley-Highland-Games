import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const db = new Database(process.env.DB_FILE || "data.sqlite");

// Enforce FKs
db.pragma("foreign_keys = ON");

// -------------------------
// Migrations (idempotent)
// -------------------------
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','user'))
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS results (
  id TEXT PRIMARY KEY,
  athlete TEXT NOT NULL,
  club TEXT,
  event_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  position INTEGER NOT NULL,
  score REAL NOT NULL,
  date TEXT NOT NULL,
  FOREIGN KEY(event_id) REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL,
  event_id   TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY(event_id) REFERENCES events(id)
);
-- Optional: prevent duplicate sign-ups for the same event
CREATE UNIQUE INDEX IF NOT EXISTS uq_reg_email_event ON registrations(email, event_id);
`);

// -------------------------
// Seed admin + default events
// -------------------------
const adminEmail = process.env.ADMIN_EMAIL || "admin@phg.local";
const adminPass = process.env.ADMIN_PASSWORD || "admin123";

const admin = db
  .prepare("SELECT id FROM users WHERE email = ?")
  .get(adminEmail);
if (!admin) {
  const hash = bcrypt.hashSync(adminPass, 10);
  db.prepare(
    "INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'admin')"
  ).run(adminEmail, hash);
  console.log(`Seeded admin: ${adminEmail} / ${adminPass}`);
}

const existingEvents = db.prepare("SELECT count(*) as c FROM events").get() as {
  c: number;
};
if (!existingEvents.c) {
  const seed = db.prepare("INSERT INTO events (id, name) VALUES (?, ?)");
  seed.run("caber", "Caber Toss");
  seed.run("tug", "Tug o’ War");
  seed.run("stone", "Stone Put");
  console.log("Seeded default events.");
}

const cols = db.prepare(`PRAGMA table_info(registrations)`).all() as any[];
if (!cols.some((c) => c.name === "status")) {
  db.exec(
    `ALTER TABLE registrations ADD COLUMN status TEXT NOT NULL DEFAULT 'pending'`
  );
}
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_reg_created ON registrations(created_at);
  CREATE INDEX IF NOT EXISTS idx_reg_status ON registrations(status);
`);

export default db;
