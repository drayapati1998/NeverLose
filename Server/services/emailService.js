const nodemailer = require("nodemailer");
const db = require("../DB/database");

// SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Helper: wait for N milliseconds
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendFoundReportEmail({ to, subject, body }) {
  const createdAt = new Date().toISOString();
  const maxRetries = process.env.MAX_EMAIL_ATTEMPT|| 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body
      });

      // Log success
      db.run(
        `INSERT INTO email_outbox (to_email, subject, body, status, created_at)
         VALUES (?, ?, ?, 'SENT', ?)`,
        [to, subject, body, createdAt]
      );

      console.log(`EMAIL SENT → ${to} (attempt ${attempt})`);
      return; // success, exit function

    } catch (err) {
      console.error(`Email attempt ${attempt} failed:`, err.message);

      // Log failure attempt
      db.run(
        `INSERT INTO email_outbox (to_email, subject, body, status, created_at)
         VALUES (?, ?, ?, ?, ?)`,
        [
          to,
          subject,
          body,
          `FAILED_ATTEMPT_${attempt}`,
          createdAt
        ]
      );

      // If last attempt, mark final failure
      if (attempt === maxRetries) {
        db.run(
          `INSERT INTO email_outbox (to_email, subject, body, status, created_at)
           VALUES (?, ?, ?, 'FAILED', ?)`,
          [to, subject, body, createdAt]
        );

        console.error("Email permanently failed after retries.");
        return;
      }

      // Exponential backoff: 1s, 2s, 4s
      const wait = 1000 * Math.pow(2, attempt - 1);
      await delay(wait);
    }
  }
}

module.exports = { sendFoundReportEmail };
