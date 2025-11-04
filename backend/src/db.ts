import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const db = new Database("data.sqlite");

// Migrations
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
`);

// Seed admin if missing
const adminEmail = process.env.ADMIN_EMAIL!;
const adminPass = process.env.ADMIN_PASSWORD!;
const admin = db.prepare(`SELECT * FROM users WHERE email = ?`).get(adminEmail);
if (!admin) {
  const hash = bcrypt.hashSync(adminPass, 10);
  db.prepare(`INSERT INTO users (email, password_hash, role) VALUES (?,?, 'admin')`)
    .run(adminEmail, hash);
  console.log(`Seeded admin: ${adminEmail} / ${adminPass}`);
}

// Seed standard events if none exist
const eventCount = db.prepare(`SELECT COUNT(*) as c FROM events`).get() as { c: number };
if (eventCount.c === 0) {
  const insert = db.prepare(`INSERT INTO events (id, name) VALUES (?,?)`);
  insert.run("caber", "Caber Toss");
  insert.run("tug", "Tug o’ War");
  insert.run("stone", "Stone Put");
  console.log("Seeded default events.");
}

export default db;
