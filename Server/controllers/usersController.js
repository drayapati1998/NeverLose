// Handles user signup, login, and profile management.
// Uses Firebase Auth for authentication and Firestore for user profiles.

const { auth, db } = require("../config/firebaseConfig");
const fetch = require("node-fetch");
const db = require("../DB/db");

/**
 * POST /api/users/signup
 * Creates a Firebase Auth user + Firestore profile.
 */
async function signup(req, res) {
  try {
    const { userid, email, password, name } = req.body;

    if (!email || !password||  !name) {
      return res.status(400).json({ error: "EMAIL_AND_PASSWORD_REQUIRED" });
    }   

  const createdAt = new Date().toISOString();

  db.run(
    `INSERT INTO users (firebase_uid, email, name, created_at)
     VALUES (?, ?, ?, ?)`,
    [uid, email, name || null, createdAt],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(409).json({ error: "USER_ALREADY_EXISTS" });
        }
        console.error("Register user error:", err);
        return res.status(500).json({ error: "INTERNAL_ERROR" });
      }

      res.status(201).json({
        id: this.lastID,
        uid,
        email,
        name: name || null
      });
    }
  );
}

}


/**
 * POST /api/users/login
 * Verifies email/password using Firebase REST API and returns ID token.
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Firebase Admin cannot verify passwords — use Firebase REST API instead.
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(401).json({ error: data.error.message });
    }

    res.json({
      idToken: data.idToken,
      refreshToken: data.refreshToken,
      uid: data.localId
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "LOGIN_FAILED" });
  }
}

/**
 * GET /api/users/me
 * Returns the authenticated user's Firestore profile.
 */
// GET /api/users/me
function getCurrentUser(req, res) {
  db.get(
    `SELECT * FROM users WHERE firebase_uid = ?`,
    [req.user.uid],
    (err, user) => {
      if (err) return res.status(500).json({ error: "INTERNAL_ERROR" });
      if (!user) return res.status(404).json({ error: "USER_NOT_FOUND" });

      res.json(user);
    }
  );
}

/**
 * PUT /api/users/me
 * Updates the authenticated user's profile.
 */
/*async function updateUser(req, res) {
  try {
    const uid = req.user.uid;
    const { name } = req.body;

    await db.collection("users").doc(uid).update({
      name: name || null,
      updatedAt: new Date().toISOString()
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
}*/

module.exports = {
  signup,
  login,
  getCurrentUser
};