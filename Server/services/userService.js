// services/userService.js
// Handles user creation, login verification, and profile retrieval.

const {admin} = require("../config/firebaseConfig");
const fetch = require("node-fetch");
const db = require("../DB/database");

/**
 * Creates a Firebase user + SQLite profile.
 */
async function createUser({ email, password, name }) {
  // Create Firebase Auth user
  const userRecord = await admin.auth().createUser({
    email,
    password,
    displayName: name,
  });

  const uid = userRecord.uid;
  const createdAt = new Date().toISOString();

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (firebase_uid, email, name, created_at)
       VALUES (?, ?, ?, ?)`,
      [uid, email, name, createdAt],
      function (err) {
        if (err) return reject(err);

        resolve({
          id: this.lastID,
          uid,
          email,
          name,
        });
      }
    );
  });
}

/**
 * Logs in a user using Firebase REST API.
 */
async function loginUser({ email, password }) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

  return {
    idToken: data.idToken,
    refreshToken: data.refreshToken,
    uid: data.localId,
  };
}

/**
 * Fetches user profile from SQLite.
 */
function getUserProfile(uid) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM users WHERE firebase_uid = ?`,
      [uid],
      (err, user) => {
        if (err) return reject(err);
        resolve(user || null);
      }
    );
  });
}

module.exports = {
  createUser,
  loginUser,
  getUserProfile,
};