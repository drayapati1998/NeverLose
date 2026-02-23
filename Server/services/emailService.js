// services/emailService.js
// Sends notification emails when a found report is submitted.

const nodemailer = require("nodemailer");
require("dotenv").config();
const db = require("../DB/database");

// Configure nodemailer transport from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * In a real app, you'd have a users table.
 * For now, this is a placeholder that derives an email from ownerUid.
 */
function getOwnerEmailByUid(ownerUid) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT owner_uid FROM items WHERE owner_uid = ? LIMIT 1",
      [ownerUid],
      (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        // Placeholder: you should replace this with real user email lookup.
        resolve(`${ownerUid}@example.com`);
      }
    );
  });
}

/**
 * Sends an email to the owner when a found report is created.
 */
async function sendFoundReportEmail(item, report) {
  const ownerEmail = await getOwnerEmailByUid(item.owner_uid);
  if (!ownerEmail) {
    console.warn("Owner email not found for uid:", item.owner_uid);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: ownerEmail,
    subject: `Neverlose: Someone found your item "${item.nickname}"`,
    text: `A finder has submitted a report for your item ${item.nickname} 
    Message: ${report.message}
Finder email: ${report.finder_email}
Location: ${report.location || "Not provided"}

Log in to your dashboard to review and respond.
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendFoundReportEmail };