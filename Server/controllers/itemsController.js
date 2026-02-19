// Owner-facing item operations: create item, list items, get label PDF.

const { db } = require("../config/firebaseConfig");
const { generateSecureToken } = require("../services/tokenService");
const { generateLabelPdf } = require("../utils/pdfGenerator");

// POST /api/items
// Creates a new item for the authenticated owner and generates a secure token.
async function createItem(req, res) {
  try {
    const uid = req.user.uid;
    const { nickname, description, photoUrl, verification } = req.body;

    const token = generateSecureToken();
    const itemRef = db.collection("items").doc();
    const now = new Date().toISOString();

    const item = {
      itemId: itemRef.id,
      ownerUid: uid,
      nickname,
      description: description || null,
      photoUrl: photoUrl || null,
      verification,
      token,
      status: "ACTIVE",
      createdAt: now,
      lastActivityAt: null
    };

    await itemRef.set(item);

    res.status(201).json({
      itemId: itemRef.id,
      token,
      status: "ACTIVE",
      createdAt: now
    });
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
}

// GET /api/items
// Lists items owned by the authenticated user.
async function listItems(req, res) {
  try {
    const uid = req.user.uid;

    const snap = await db.collection("items").where("ownerUid", "==", uid).get();
    const items = snap.docs.map(doc => doc.data());

    res.json(items);
  } catch (err) {
    console.error("Error listing items:", err);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
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