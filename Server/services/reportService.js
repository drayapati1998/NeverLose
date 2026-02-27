const db = require("../DB/database");

function listReportsForItem(itemId, ownerUid) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT r.*
       FROM reports r
       JOIN items i ON r.item_id = i.id
       WHERE r.item_id = ? AND i.owner_uid = ?
       ORDER BY r.created_at DESC`,
      [itemId, ownerUid],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

function getReport(reportId, ownerUid) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT r.*, i.owner_uid
       FROM reports r
       JOIN items i ON r.item_id = i.id
       WHERE r.id = ?`,
      [reportId],
      (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        if (row.owner_uid !== ownerUid) return resolve("FORBIDDEN");
        resolve(row);
      }
    );
  });
}

function updateReportStatus(reportId, status) {
  return new Promise((resolve, reject) => {
    const updatedAt = new Date().toISOString();
    db.run(
      `UPDATE reports SET status = ?, updated_at = ? WHERE id = ?`,
      [status, updatedAt, reportId],
      function (err) {
        if (err) return reject(err);
        resolve({ ok: true });
      }
    );
  });
}

module.exports = {
  listReportsForItem,
  getReport,
  updateReportStatus
};