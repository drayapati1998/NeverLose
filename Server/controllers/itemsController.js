// controllers/itemsController.js
// Handles item creation and listing. Photo upload is handled separately.

const { ItemService } = require("../services/itemService");

exports.createItem = async (req, res) => {
  try {
    const ownerId = req.user.uid;

    // photoUrl now comes from frontend after upload
    const item = await ItemService.createItem(ownerId, req.body);

    res.status(201).json({
      itemId: item.id,
      token: item.token,
      status: item.status,
      createdAt: item.createdAt,
      photoUrl: item.photoUrl,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listItems = async (req, res) => {
  try {
    const ownerId = req.user.uid;
    const items = await ItemService.listItems(ownerId);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to list items" });
  }
};