const express = require("express");
const router = express.Router();
const requireFirebaseAuth = require("../middleware/firebaseAuth");
const {
  getReports,
  getReportDetail,
  changeStatus
} = require("../controllers/reportController");

router.get("/:itemId", requireFirebaseAuth, getReports);
router.get("/detail/:reportId", requireFirebaseAuth, getReportDetail);
router.post("/detail/:reportId/status", requireFirebaseAuth, changeStatus);

module.exports = router;