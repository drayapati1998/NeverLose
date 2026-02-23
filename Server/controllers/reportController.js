// controllers/reportController.js
// Handles public found report submission and owner report viewing.

const itemService = require("../services/itemService");
const reportService = require("../services/reportService");
const { sendFoundReportEmail } = require("../services/emailService");

/**
 * POST /reports/public/:token
 * Public endpoint: finder submits a found report for an item.
 */
async function submitFoundReport(req, res) {
  try {
    const { token } = req.params;
    const {
      finder_email,
      finder_name,
      finder_phone,
      location,
      message,
      photo_url,
    } = req.body;

    if (!finder_email || !message) {
      return res
        .status(400)
        .json({ error: "finder_email and message are required" });
    }

    const item = await itemService.getItemByToken(token);
    if (!item || !item.is_active) {
      return res.status(404).json({ error: "Tag not found or inactive" });
    }

    const report = await reportService.createFoundReport({
      itemId: item.id,
      finderEmail: finder_email,
      finderName: finder_name,
      finderPhone: finder_phone,
      location,
      message,
      photoUrl: photo_url,
    });

    // Fire-and-forget email notification
    sendFoundReportEmail(item, report).catch((err) =>
      console.error("Email send error:", err)
    );

    res.status(201).json({ success: true, report });
  } catch (err) {
    console.error("Submit report error:", err);
    res.status(500).json({ error: "Failed to submit report" });
  }
}

/**
 * GET /reports/my
 * Owner endpoint: view all reports for their items.
 */
async function getMyReports(req, res) {
  try {
    const ownerUid = req.user.uid;
    const reports = await reportService.getReportsForOwner(ownerUid);
    res.json(reports);
  } catch (err) {
    console.error("Get reports error:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
}

module.exports = {
  submitFoundReport,
  getMyReports,
};