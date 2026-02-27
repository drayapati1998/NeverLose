// controllers/itemController.js
// Handles HTTP requests related to owner items.

const itemService = require("../services/itemService");

/**
 * POST /items
 * Creates a new item for the authenticated owner.
 */
async function createItem(req, res) {
  try {
    const ownerUid = req.user.uid;
    const { nickname, description, photoUrl, verification } = req.body;

    // 1. Nickname required
    if (!nickname || !nickname.trim()) {
      return res.status(400).json({ error: "NICKNAME_REQUIRED" });
    }

    // 2. Verification rules
    const verificationEnabled = !!verification?.enabled;
    const verificationQuestion = verification?.question?.trim();

    if (verificationEnabled && !verificationQuestion) {
      return res.status(400).json({ error: "VERIFICATION_QUESTION_REQUIRED" });
    }

    // 3. Create item
    const item = await itemService.createItem(ownerUid, {
      nickname,
      description,
      photoUrl,
      verification
    });

    // 4. Label presets for Label Screen
    const labelPresets = [
      { id: "wallet", name: "Wallet", shape: "rect", widthMm: 85.6, heightMm: 54.0 },
      { id: "airtag", name: "AirTag", shape: "circle", diameterMm: 32.0 },
      { id: "small-tag", name: "Small Tag", shape: "rect", widthMm: 30.0, heightMm: 20.0 },
      { id: "custom", name: "Custom", shape: "custom" }
    ];

    res.status(201).json({
      id: item.id,
      nickname: nickname.trim(),
      description: description?.trim() || null,
      photoUrl: photoUrl || null,
      verification: {
        enabled: verificationEnabled,
        question: verificationEnabled ? verificationQuestion : null
      },
      token: item.token,
      status: "ACTIVE",
      createdAt: item.createdAt,
      publicScanUrl: `${process.env.HOST_URL}/f/${item.token}`,
      labelPresets
    });
  } catch (err) {
    console.error("Create item error:", err);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
}


/**
 * GET /items
 * Returns all items for the authenticated owner.
 */
async function getMyItems(req, res) {
  try {
    const ownerUid = req.user.uid;
    const items = await itemService.getItemsByOwner(ownerUid);
    res.status(200).json(items);
  } catch (err) {
    console.error("Fetch items error:", err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
}

module.exports = {
  createItem,
  getMyItems,
};