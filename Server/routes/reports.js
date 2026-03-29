const express = require("express");
const router = express.Router();

const requireFirebaseAuth = require("../middleware/firebaseAuth");
const reportController = require("../controllers/reportController");

// List all reports for a specific item (owner only)
router.get("/:itemId/reports", requireFirebaseAuth, reportController.getReports);

// Get a single report by ID (owner only)
router.get("/report/:reportId", requireFirebaseAuth, reportController.getReportDetail);

// Update report status
router.patch("/report/:reportId", requireFirebaseAuth, reportController.changeStatus);

module.exports = router;