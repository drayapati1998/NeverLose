// services/itemService.js
// Encapsulates all DB operations related to items.

const db = require("../DB/database");
const { generateSecureToken } = require("./tokenService");

/**
 * Creates a new item for the given owner with a unique QR token.
 */
function createItem(ownerUid, { nickname, description, photoUrl, verification }) {
  return new Promise((resolve, reject) => {
    const verificationEnabled = !!verification?.enabled;
    const verificationQuestion = verificationEnabled ? verification.question.trim() : null;

    const token = generateSecureToken();
    const createdAt = new Date().toISOString();

    db.run(
      `INSERT INTO items (
        owner_uid,
        nickname,
        description,
        photo_url,
        verification_enabled,
        verification_question,
        token,
        status,
        created_at,
        last_activity_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?, NULL)`,
      [
        ownerUid,
        nickname.trim(),
        description?.trim() || null,
        photoUrl || null,
        verificationEnabled ? 1 : 0,
        verificationQuestion,
        token,
        createdAt
      ],
      function (err) {
        if (err) return reject(err);

        resolve({
          id: this.lastID,
          token,
          createdAt
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
      `SELECT
         id,
         nickname,
         description,
         photo_url AS photoUrl,
         status,
         created_at AS createdAt,
         last_activity_at AS lastActivityAt,
         token
       FROM items
       WHERE owner_uid = ?
       ORDER BY created_at DESC`,
      [ownerUid],
      (err, rows) => {
        if (err) return reject(err);

        const items = rows.map(row => ({
          id: row.id,
          nickname: row.nickname,
          description: row.description,
          photoUrl: row.photoUrl,
          status: row.status,
          createdAt: row.createdAt,
          lastActivityAt: row.lastActivityAt,
          token:row.token,
          publicScanUrl: `/f/${row.token}`
        }));

        resolve(items);
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