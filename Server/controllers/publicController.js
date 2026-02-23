// controllers/publicController.js
// Handles public (unauthenticated) operations like scanning a QR code.

const itemService = require("../services/itemService");

/**
 * GET /public/scan/:token
 * Returns safe item info for a QR token.
 */
async function getItemByToken(req, res) {
  try {
    const { token } = req.params;

    const item = await itemService.getItemByToken(token);

    if (!item || !item.is_active) {
      return res.status(404).json({ error: "Tag not found or inactive" });
    }

    // Do NOT expose owner_uid or any sensitive data
    res.json({
      id: item.id,
      nickname: item.nickname,
      description: item.description,
      qr_token: item.qr_token,
    });
  } catch (err) {
    console.error("Public scan error:", err);
    res.status(500).json({ error: "Failed to fetch item" });
  }
}

module.exports = { getItemByToken };