// services/reportService.js
// Firestore operations for reports stored in a top-level "reports" collection.

const { db } = require("../config/firebaseConfig");

const REPORTS = "foundReports";
const ITEMS = "items";

exports.ReportService = {
  async listReportsForItem(itemId, ownerId) {
    // Verify item belongs to owner
    const itemSnap = await db.collection(ITEMS).doc(itemId).get();
    if (!itemSnap.exists) return [];

    const item = itemSnap.data();
    if (item.ownerId !== ownerId) return [];

    // Fetch reports for this item
    const snap = await db
      .collection(REPORTS)
      .where("itemId", "==", itemId)
      .orderBy("createdAt", "desc")
      .get();

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getReport(reportId, ownerId) {
    const reportSnap = await db.collection(REPORTS).doc(reportId).get();
    if (!reportSnap.exists) return null;

    const report = reportSnap.data();

    // Fetch related item to verify ownership
    const itemSnap = await db.collection(ITEMS).doc(report.itemId).get();
    if (!itemSnap.exists) return null;

    const item = itemSnap.data();
    if (item.ownerId !== ownerId) return "FORBIDDEN";

    return { id: reportSnap.id, ...report };
  },

  async updateReportStatus(reportId, status) {
    const updatedAt = new Date().toISOString();

    await db.collection(REPORTS).doc(reportId).update({
      status,
      updatedAt,
    });

    return { ok: true };
  },
};