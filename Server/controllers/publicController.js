const {
  getPublicItemByToken,
  createFoundReport
} = require("../services/publicService");
const { sendFoundReportEmail } = require("../services/emailService");
// GET /api/public/items/:token
async function getPublicItem(req, res) {
  try {
    const { token } = req.params;
    const item = await getPublicItemByToken(token);

    if (!item) {
      return res.status(404).json({ error: "ITEM_NOT_FOUND" });
    }

    return res.json({
      token: item.token,
      nickname: item.nickname,
      status: item.status,
      verificationQuestion: item.verificationQuestion
    });
  } catch (err) {
    console.error("Public item error:", err);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
}

// POST /api/public/items/:token/found
async function submitFoundReport(req, res) {
  try {
    const { token } = req.params;
    const { finder, message, foundLocationText, photoUrl, verificationAnswer } = req.body;

    const item = await getPublicItemByToken(token);
    if (!item) {
      return res.status(404).json({ error: "ITEM_NOT_FOUND" });
    }

    if (item.status === "CLOSED") {
      return res.status(400).json({ error: "ITEM_CLOSED" });
    }

    // basic validation
    if (!finder || !finder.email || !finder.email.trim()) {
      return res.status(400).json({ error: "FINDER_EMAIL_REQUIRED" });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "MESSAGE_REQUIRED" });
    }
    if (item.verificationQuestion && (!verificationAnswer || !verificationAnswer.trim())) {
      return res.status(400).json({ error: "VERIFICATION_ANSWER_REQUIRED" });
    }

    const { reportId } = await createFoundReport({
      itemId: item.itemId,
      finder: {
        name: finder.name?.trim() || null,
        email: finder.email.trim(),
        phone: finder.phone?.trim() || null
      },
      message: message.trim(),
      foundLocationText: foundLocationText?.trim() || null,
      photoUrl: photoUrl || null,
      verificationAnswer: verificationAnswer?.trim() || null
    });

     // Fetch owner email
  const owner = await getItemOwner(item.itemId);

  const emailBody = `
Your item "${item.nickname}" was reported found.

Finder Email: ${finder.email}
Finder Phone: ${finder.phone || "N/A"}
Message: ${message}
Location: ${foundLocationText || "N/A"}
Verification Answer: ${verificationAnswer || "N/A"}
Photo: ${photoUrl || "N/A"}

Report ID: ${reportId}
  `;

  await sendFoundReportEmail({
    to: owner.email,
    subject: "Your item was found",
    body: emailBody
  });

  return res.status(201).json({ ok: true, reportId });

  } catch (err) {
    console.error("Found report error:", err);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
}

module.exports = {
  getPublicItem,
  submitFoundReport
};