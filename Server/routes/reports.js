// routes/reportRoutes.js
// Routes for found reports (public + owner).

const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const requireFirebaseAuth = require("../middleware/firebaseAuth");
const { publicLimiter } = require("../middleware/rateLimiter");

// Public submission (rate-limited)
router.post("/public/:token", publicLimiter, reportController.submitFoundReport);

// Owner view (protected)
router.get("/my", requireFirebaseAuth, reportController.getMyReports);

module.exports = router;