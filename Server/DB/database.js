// db/database.js
// Centralized SQLite database initialization and schema definition.

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create or open the SQLite DB file in this folder
const dbPath = path.join(__dirname, "neverlose.db");
const db = new sqlite3.Database(dbPath);

// Initialize tables once on startup
db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firebase_uid TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at TEXT
  )
`);
  // Items table: represents owner-registered items with QR tokens
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_uid TEXT NOT NULL,
      nickname TEXT NOT NULL,
      description TEXT,
      qr_token TEXT UNIQUE NOT NULL,
      is_active INTEGER DEFAULT 1
    )
  `);

  // Found reports table: submissions from finders
  db.run(`
    CREATE TABLE IF NOT EXISTS found_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL,
      finder_email TEXT NOT NULL,
      finder_name TEXT,
      finder_phone TEXT,
      location TEXT,
      message TEXT NOT NULL,
      photo_url TEXT,
      status TEXT DEFAULT 'NEW',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (item_id) REFERENCES items(id)
    )
  `);
});

module.exports = db;