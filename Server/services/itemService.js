// services/itemService.js
// Encapsulates all DB operations related to items.

const db = require("../DB/database");
const { generateQrToken } = require("./tokenService");

/**
 * Creates a new item for the given owner with a unique QR token.
 */
function createItem(ownerUid, nickname, description) {
  return new Promise((resolve, reject) => {
    const qrToken = generateQrToken();

    const stmt = db.prepare(
      "INSERT INTO items (owner_uid, nickname, description, qr_token) VALUES (?, ?, ?, ?)"
    );

    stmt.run(
      ownerUid,
      nickname,
      description || null,
      qrToken,
      function (err) {
        if (err) return reject(err);

        resolve({
          id: this.lastID,
          owner_uid: ownerUid,
          nickname,
          description,
          qr_token: qrToken,
        });
      }
    );
  });
}

/**
 * Returns all items belonging to a specific owner.
 */
function getItemsByOwner(ownerUid) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM items WHERE owner_uid = ?",
      [ownerUid],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

/**
 * Looks up an item by its QR token (used by public scan).
 */
function getItemByToken(qrToken) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM items WHERE qr_token = ?",
      [qrToken],
      (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      }
    );
  });
}

module.exports = {
  createItem,
  getItemsByOwner,
  getItemByToken,
};