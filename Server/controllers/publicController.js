// Public-facing endpoints: scan page data + found report submission.

const { db } = require("../config/firebaseConfig");

// GET /api/public/items/:token
// Returns safe data for the public scan page.
async function getPublicItem(req, res) {
  try {
    const { token } = req.params;

    const snap = await db.collection("items").where("token", "==", token).limit(1).get();
    if (snap.empty) {
      return res.status(404).json({ error: "INVALID_TOKEN" });
    }

    const item = snap.docs[0].data();

    res.json({
      token: item.token,
      nickname: item.nickname,
      status: item.status,
      verificationQuestion: item.verification?.enabled ? item.verification.question : null
    });
  } catch (err) {
    console.error("Error loading public item:", err);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
}

// POST /api/public/items/:token/found
// Creates a found report for the item (no login required).
async function submitFoundReport(req, res) {
  try {
    const { token } = req.params;

    const snap = await db.collection("items").where("token", "==", token).limit(1).get();
    if (snap.empty) {
      return res.status(404).json({ ok: false, error: "INVALID_TOKEN" });
    }

    const itemDoc = snap.docs[0];
    const item = itemDoc.data();

    if (item.status === "CLOSED") {
      return res.status(400).json({ ok: false, error: "ITEM_CLOSED" });
    }

    const { finder, message, foundLocationText, photoUrl, verificationAnswer } = req.body;

    // If verification is enabled, require an answer.
    if (item.verification?.enabled && !verificationAnswer?.trim()) {
      return res.status(400).json({ ok: false, error: "MISSING_VERIFICATION_ANSWER" });
    }

    const reportRef = db.collection("reports").doc();
    const now = new Date().toISOString();

    await reportRef.set({
      reportId: reportRef.id,
      itemId: item.itemId,
      finderEmail: finder.email,
      finderPhone: finder.phone || null,
      finderName: finder.name || null,
      message,
      foundLocationText: foundLocationText || null,
      photoUrl: photoUrl || null,
      verificationAnswer: verificationAnswer || null,
      status: "NEW",
      createdAt: now
    });

    // Update last activity on the item.
    await itemDoc.ref.update({ lastActivityAt: now });

    res.json({ ok: true, reportId: reportRef.id });
  } catch (err) {
    console.error("Error submitting found report:", err);
    res.status(500).json({ ok: false, error: "INTERNAL_ERROR" });
  }
}

module.exports = { getPublicItem, submitFoundReport };