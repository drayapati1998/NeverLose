// Owner-facing item operations: create item, list items, get label PDF.

const db = require("../DB/db");

const { generateSecureToken } = require("../services/tokenService");
const { generateLabelPdf } = require("../utils/pdfGenerator");

// POST /api/items
// Creates a new item for the authenticated owner and generates a secure token.
function createItem(req, res) {
  const { nickname, description, photoUrl, verification } = req.body;
  const ownerUid = req.user.uid;

  if (!nickname) {
    return res.status(400).json({ error: "NICKNAME_REQUIRED" });
  }

  const token = generateToken();
  const createdAt = new Date().toISOString();

  db.run(
    `INSERT INTO items (
      owner_uid, nickname, description, photo_url,
      verification_enabled, verification_question,
      token, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?)`,
    [
      ownerUid,
      nickname,
      description || null,
      photoUrl || null,
      verification?.enabled ? 1 : 0,
      verification?.enabled ? verification.question : null,
      token,
      createdAt
    ],
    function (err) {
      if (err) return res.status(500).json({ error: "INTERNAL_ERROR" });

      res.status(201).json({
        id: this.lastID,
        token,
        status: "ACTIVE",
        createdAt
      });
    }
  );
}

// GET /api/items
function listItems(req, res) {
  db.all(
    `SELECT * FROM items WHERE owner_uid = ? ORDER BY created_at DESC`,
    [req.user.uid],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "INTERNAL_ERROR" });
      res.json(rows);
    }
  );
}



// GET /api/items/:itemId/label?preset=wallet|airtag|smalltag|custom
// Returns a PDF label for the item with the chosen preset.
async function getLabel(req, res) {
  try {
    const uid = req.user.uid;
    const { itemId } = req.params;
    const { preset, widthMm, heightMm, diameterMm } = req.query;

    const doc = await db.collection("items").doc(itemId).get();
    if (!doc.exists) return res.status(404).end();

    const item = doc.data();

    // Enforce ownership: only the owner can generate labels.
    if (item.ownerUid !== uid) return res.status(403).end();

    const pdf = await generateLabelPdf({
      preset,
      token: item.token,
      widthMm: widthMm ? Number(widthMm) : undefined,
      heightMm: heightMm ? Number(heightMm) : undefined,
      diameterMm: diameterMm ? Number(diameterMm) : undefined
    });

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
  } catch (err) {
    console.error("Error generating label:", err);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
}

module.exports = { createItem, listItems, getLabel };