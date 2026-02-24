// db/database.js
// Centralized SQLite database initialization and schema definition.

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create or open the SQLite DB file in this folder
const dbPath = path.join(__dirname, "neverlose.db");
const db = new sqlite3.Database(dbPath);

// Initialize schema
db.serialize(() => {
  //
  // USERS TABLE
  // Mirrors Firebase users (firebase_uid is the primary identity)
  //
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      firebase_uid  TEXT UNIQUE NOT NULL,
      email         TEXT NOT NULL,
      name          TEXT,
      created_at    TEXT NOT NULL
    )
  `);

  //
  // ITEMS TABLE
  // Owned by firebase_uid
  // Supports verification setup + secure token + activity tracking
  //
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id                     INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_uid              TEXT NOT NULL,
      nickname               TEXT NOT NULL,
      description            TEXT,
      photo_url              TEXT,
      verification_enabled   INTEGER NOT NULL DEFAULT 0,
      verification_question  TEXT,
      token                  TEXT UNIQUE NOT NULL,   -- >=128-bit URL-safe token
      status                 TEXT NOT NULL DEFAULT 'ACTIVE', -- ACTIVE | CLOSED
      created_at             TEXT NOT NULL,
      last_activity_at       TEXT,
      FOREIGN KEY (owner_uid) REFERENCES users(firebase_uid)
    )
  `);

  //
  // REPORTS TABLE
  // Public found reports submitted via /f/{token}
  //
  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id                  INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id             INTEGER NOT NULL,
      finder_email        TEXT NOT NULL,
      finder_phone        TEXT,
      finder_name         TEXT,
      message             TEXT NOT NULL,
      found_location_text TEXT,
      photo_url           TEXT,
      verification_answer TEXT,
      status              TEXT NOT NULL DEFAULT 'NEW', -- NEW | OWNER_CONTACTED | RESOLVED | SPAM
      created_at          TEXT NOT NULL,
      updated_at          TEXT,
      FOREIGN KEY (item_id) REFERENCES items(id)
    )
  `);

  //
  // EMAIL OUTBOX TABLE
  // Logs all outgoing owner notifications (for Cypress + debugging)
  //
  db.run(`
    CREATE TABLE IF NOT EXISTS email_outbox (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id       INTEGER,
      to_email      TEXT NOT NULL,
      subject       TEXT NOT NULL,
      status        TEXT NOT NULL, -- SENT | FAILED
      error_message TEXT,
      created_at    TEXT NOT NULL,
      FOREIGN KEY (item_id) REFERENCES items(id)
    )
  `);
});

module.exports = db;