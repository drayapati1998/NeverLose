// Owner routes: require Firebase auth.

const express = require("express");
const router = express.Router();

const { requireFirebaseAuth } = require("../middleware/firebaseAuth");
const { validateBody } = require("../middleware/validate");
const { createItemSchema } = require("../utils/validators");
const { createItem, listItems, getLabel } = require("../controllers/itemsController");

// Create item (wizard submit)
router.post("/", requireFirebaseAuth, validateBody(createItemSchema), createItem);

// List owner's items
router.get("/", requireFirebaseAuth, listItems);

// Get label PDF for an item
router.get("/:itemId/label", requireFirebaseAuth, getLabel);

module.exports = router;