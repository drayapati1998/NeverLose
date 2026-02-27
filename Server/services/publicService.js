const db = require("../DB/database");
const {auth} = require("../config/firebaseConfig"); // Firebase Admin SDK

function getPublicItemByToken(token) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, nickname, status, verification_enabled, verification_question
       FROM items
       WHERE token = ?`,
      [token],
      (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);

        resolve({
          itemId: row.id,
          token,
          nickname: row.nickname,
          status: row.status,
          verificationQuestion:
            row.verification_enabled ? row.verification_question : null
        });
      }
    );
  });
}

function createFoundReport({ itemId, finder, message, foundLocationText, photoUrl, verificationAnswer }) {
  return new Promise((resolve, reject) => {
    const createdAt = new Date().toISOString();

    db.run(
      `INSERT INTO reports (
        item_id,
        finder_email,
        finder_phone,
        finder_name,
        message,
        found_location_text,
        photo_url,
        verification_answer,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NEW', ?, NULL)`,
      [
        itemId,
        finder.email,
        finder.phone || null,
        finder.name || null,
        message,
        foundLocationText || null,
        photoUrl || null,
        verificationAnswer || null,
        createdAt
      ],
      function (err) {
        if (err) return reject(err);
        resolve({ reportId: this.lastID });
      }
    );
  });
}

function getItemOwner(itemId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT owner_uid, nickname
       FROM items
       WHERE id = ?`,
      [itemId],
      async (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);

        try {
          // Fetch Firebase user by UID
          const userRecord = await auth.getUser(row.owner_uid);

          resolve({
            ownerUid: row.owner_uid,
            email: userRecord.email,
            nickname: row.nickname
          });
        } catch (firebaseErr) {
          reject(firebaseErr);
        }
      }
    );
  });
}


module.exports = {
  getPublicItemByToken,
  createFoundReport,
  getItemOwner
};