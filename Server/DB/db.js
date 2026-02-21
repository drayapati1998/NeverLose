// SQLite database initialization and schema creation.

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../../data.sqlite");
const db = new sqlite3.Database(dbPath);

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firebase_uid TEXT UNIQUE NOT NULL,
      email TEXT NOT NULL,
      name TEXT,
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_uid TEXT NOT NULL,
      nickname TEXT NOT NULL,
      description TEXT,
      photo_url TEXT,
      verification_enabled INTEGER NOT NULL DEFAULT 0,
      verification_question TEXT,
      token TEXT UNIQUE NOT NULL,
      status TEXT NOT NULL DEFAULT 'ACTIVE',
      created_at TEXT NOT NULL,
      last_activity_at TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL,
      finder_email TEXT NOT NULL,
      finder_phone TEXT,
      finder_name TEXT,
      message TEXT NOT NULL,
      found_location_text TEXT,
      photo_url TEXT,
      verification_answer TEXT,
      status TEXT NOT NULL DEFAULT 'NEW',
      created_at TEXT NOT NULL,
      updated_at TEXT,
      FOREIGN KEY (item_id) REFERENCES items(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS email_outbox (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER,
      to_email TEXT NOT NULL,
      subject TEXT NOT NULL,
      status TEXT NOT NULL,
      error_message TEXT,
      created_at TEXT NOT NULL
    )
  `);
});

module.exports = db;