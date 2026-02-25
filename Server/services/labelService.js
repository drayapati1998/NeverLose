// src/services/labelService.js

const db = require("../DB/database");
const { generateLabelPdf } = require("../utils/pdfGenerator");

async function getItemForLabel(itemId, ownerUid) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, token, owner_uid FROM items WHERE id = ?`,
      [itemId],
      (err, item) => {
        if (err) return reject(err);
        if (!item) return resolve(null);
        if (item.owner_uid !== ownerUid) return resolve("FORBIDDEN");
        resolve(item);
      }
    );
  });
}

async function generateLabel(item, params) {
  const { preset, widthMm, heightMm, diameterMm } = params;

  return await generateLabelPdf({
    token: item.token,
    preset,
    widthMm: widthMm ? Number(widthMm) : undefined,
    heightMm: heightMm ? Number(heightMm) : undefined,
    diameterMm: diameterMm ? Number(diameterMm) : undefined
  });
}

module.exports = {
  getItemForLabel,
  generateLabel
};