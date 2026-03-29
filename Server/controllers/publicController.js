const {PublicService} = require("../services/publicService")
const { sendFoundReportEmail } = require("../services/emailService");
// GET /api/public/items/:token
async function getPublicItem(req, res) {
 try {
    const { token } = req.params;

    const item = await PublicService.getItemByToken(token);
    if (!item) {
      return res.status(404).json({ error: "Tag not found" });
    }

    const publicView = PublicService.toPublicView(item);

    // If CLOSED, still return but UI should show inactive state
    return res.json(publicView);
  } catch (err) {
    console.error("Public item fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }

}

// POST /api/public/items/:token/found
async function submitFoundReport(req, res) {
  try {
    const { token } = req.params;
    const payload = req._validatedFoundReport;

    const item = await PublicService.getItemByToken(token);
    const ownerid = item.ownerId;
    if (!item) {
      return res.status(404).json({ error: "Tag not found" });
    }

    if (item.status === "CLOSED") {
      return res.status(400).json({ error: "This tag is inactive" });
    }

    // If verification is enabled, require non-empty answer
    if (item.verification?.enabled) {
      if (!payload.verificationAnswer || !payload.verificationAnswer.trim()) {
        return res
          .status(400)
          .json({ error: "Verification answer is required" });
      }
    }

    const result = await PublicService.createFoundReport({
      item,
      token,
      payload,
    });
const reportId = result.reportId;
   // res.status(201).json(result); // { ok: true, reportId }
      // Fetch owner email
 const owner = await PublicService.getItemOwner(ownerid);

  const emailBody = `
Your item "${item.nickname}" was reported found.

Finder Email: ${payload.finder.email}
Finder Phone: ${payload.finder.phone || "N/A"}
Finder Name: ${payload.finder.Name || "N/A"}
Message: ${payload.message}
Location: ${payload.foundLocationText || "N/A"}
Verification Answer: ${payload.verificationAnswer || "N/A"}
Photo: ${payload.photoUrl || "N/A"}

  `;

  await sendFoundReportEmail({
    to: owner.email,
    subject: "Your item was found",
    body: emailBody
  });

  return res.status(201).json({ ok: true, reportId});
  } catch (err) {
    console.error("Found report submit error:", err);
    res.status(500).json({ error: "Server error" });
  }


   

  
}

module.exports = {
  getPublicItem,
  submitFoundReport
};