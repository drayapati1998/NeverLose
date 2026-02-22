// routes/itemRoutes.js
// Routes for owner item management.

const express = require("express");
const router = express.Router();
const requireFirebaseAuth = require("../middleware/firebaseAuth");
const itemController = require("../controllers/itemsController");

// Protected routes
router.post("/", requireFirebaseAuth, itemController.createItem);
router.get("/", requireFirebaseAuth, itemController.getMyItems);

module.exports = router;