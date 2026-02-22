// services/reportService.js
// Handles creation and retrieval of found reports.

const db = require("../DB/database");

/**
 * Creates a found report for a specific item.
 */
function createFoundReport({
  itemId,
  finderEmail,
  finderName,
  finderPhone,
  location,
  message,
  photoUrl,
}) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      `
      INSERT INTO found_reports
      (item_id, finder_email, finder_name, finder_phone, location, message, photo_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    );

    stmt.run(
      itemId,
      finderEmail,
      finderName || null,
      finderPhone || null,
      location || null,
      message,
      photoUrl || null,
      function (err) {
        if (err) return reject(err);

        resolve({
          id: this.lastID,
          item_id: itemId,
          finder_email: finderEmail,
          finder_name: finderName,
          finder_phone: finderPhone,
          location,
          message,
          photo_url: photoUrl,
        });
      }
    );
  });
}

/**
 * Returns all found reports for items owned by the given owner.
 */
function getReportsForOwner(ownerUid) {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT fr.*, i.nickname
      FROM found_reports fr
      JOIN items i ON fr.item_id = i.id
      WHERE i.owner_uid = ?
      ORDER BY fr.created_at DESC
    `,
      [ownerUid],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

module.exports = {
  createFoundReport,
  getReportsForOwner,
};