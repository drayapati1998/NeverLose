const db = require("../DB/database");

async function sendFoundReportEmail({ to, subject, body }) {
  const createdAt = new Date().toISOString();

  // In dev/test: log to outbox
  db.run(
    `INSERT INTO email_outbox (to_email, subject, body, status, created_at)
     VALUES (?, ?, ?, 'SENT', ?)`,
    [to, subject, body, createdAt]
  );

  // In production: integrate real email provider
  console.log("EMAIL SENT →", to, subject);
}

module.exports = { sendFoundReportEmail };