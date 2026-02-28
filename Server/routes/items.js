// routes/itemRoutes.js
// Routes for owner item management. These endpoints allow authenticated owners
// to create items and list their existing items. All routes are protected by
// Firebase authentication middleware.

const express = require("express");
const router = express.Router();

// Middleware that verifies Firebase ID tokens and attaches req.user.uid
const requireFirebaseAuth = require("../middleware/firebaseAuth");

// Controller containing item creation and listing logic
const itemsController = require("../controllers/itemsController");

// Create a new item for the authenticated owner
router.post("/", requireFirebaseAuth, itemsController.createItem);

// List all items belonging to the authenticated owner
router.get("/", requireFirebaseAuth, itemsController.listItems);

module.exports = router;