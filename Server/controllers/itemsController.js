// controllers/itemController.js
// Handles HTTP requests related to owner items.

const itemService = require("../services/itemService");

/**
 * POST /items
 * Creates a new item for the authenticated owner.
 */
async function createItem(req, res) {
  try {
    const { nickname, description } = req.body;

    if (!nickname) {
      return res.status(400).json({ error: "Nickname is required" });
    }

    const ownerUid = req.user.uid;

    const item = await itemService.createItem(ownerUid, nickname, description);
    res.status(201).json(item);
  } catch (err) {
    console.error("Create item error:", err);
    res.status(500).json({ error: "Failed to create item" });
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
    res.json(items);
  } catch (err) {
    console.error("Fetch items error:", err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
}

module.exports = {
  createItem,
  getMyItems,
};