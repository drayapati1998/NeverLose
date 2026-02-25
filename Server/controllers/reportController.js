const {
  listReportsForItem,
  getReport,
  updateReportStatus
} = require("../services/reportService");

async function getReports(req, res) {
  const { itemId } = req.params;
  const ownerUid = req.user.uid;

  const reports = await listReportsForItem(itemId, ownerUid);
  return res.json(reports);
}

async function getReportDetail(req, res) {
  const { reportId } = req.params;
  const ownerUid = req.user.uid;

  const report = await getReport(reportId, ownerUid);

  if (report === null) return res.status(404).json({ error: "NOT_FOUND" });
  if (report === "FORBIDDEN") return res.status(403).json({ error: "FORBIDDEN" });

  return res.json(report);
}

async function changeStatus(req, res) {
  const { reportId } = req.params;
  const { status } = req.body;
  const ownerUid = req.user.uid;

  const report = await getReport(reportId, ownerUid);
  if (report === null) return res.status(404).json({ error: "NOT_FOUND" });
  if (report === "FORBIDDEN") return res.status(403).json({ error: "FORBIDDEN" });

  const valid = ["NEW", "OWNER_CONTACTED", "RESOLVED", "SPAM"];
  if (!valid.includes(status)) {
    return res.status(400).json({ error: "INVALID_STATUS" });
  }

  await updateReportStatus(reportId, status);
  return res.json({ ok: true });
}

module.exports = {
  getReports,
  getReportDetail,
  changeStatus
};