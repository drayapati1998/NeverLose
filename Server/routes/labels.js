// src/routes/labelRoute.js

const express = require("express");
const router = express.Router();

const requireFirebaseAuth = require("../middleware/firebaseAuth");
const { downloadLabelPdf } = require("../controllers/labelController");

// GET /api/labels/:itemId/pdf
router.get("/:itemId/pdf", requireFirebaseAuth, downloadLabelPdf);

module.exports = router;