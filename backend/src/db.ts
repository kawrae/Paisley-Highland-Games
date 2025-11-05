import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const db = new Database(process.env.DB_FILE || "data.sqlite");
db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','user'))
);

CREATE TABLE IF NOT EXISTS events (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

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

CREATE UNIQUE INDEX IF NOT EXISTS uq_reg_email_event ON registrations(email, event_id);
CREATE INDEX IF NOT EXISTS idx_results_event ON results(event_id);
CREATE INDEX IF NOT EXISTS idx_results_date  ON results(date);
CREATE INDEX IF NOT EXISTS idx_reg_created   ON registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_reg_status    ON registrations(status);
`);

const cols = db.prepare(`PRAGMA table_info(registrations)`).all() as any[];
if (!cols.some((c) => c.name === "status")) {
  db.exec(
    `ALTER TABLE registrations ADD COLUMN status TEXT NOT NULL DEFAULT 'pending'`
  );
}

const adminEmail = process.env.ADMIN_EMAIL || "admin@phg.local";
const adminPass = process.env.ADMIN_PASSWORD || "admin123";

const hash = bcrypt.hashSync(adminPass, 10);
const existing = db
  .prepare("SELECT id FROM users WHERE email=?")
  .get(adminEmail);
if (existing) {
  db.prepare(
    "UPDATE users SET password_hash=?, role='admin' WHERE email=?"
  ).run(hash, adminEmail);
} else {
  db.prepare(
    "INSERT INTO users (email, password_hash, role) VALUES (?,?, 'admin')"
  ).run(adminEmail, hash);
}
console.log("Admin seeded:", adminEmail);

const { c: eventCount } = db
  .prepare("SELECT count(*) as c FROM events")
  .get() as { c: number };
if (!eventCount) {
  const seed = db.prepare("INSERT INTO events (id, name) VALUES (?, ?)");
  seed.run("caber", "Caber Toss");
  seed.run("tug", "Tug o’ War");
  seed.run("stone", "Stone Put");
  console.log("Seeded default events.");
}

export default db;
