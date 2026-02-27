// src/controllers/labelController.js

const { getItemForLabel, generateLabel } = require("../services/labelService");

async function downloadLabelPdf(req, res) {
  try {
    const { itemId } = req.params;
    const ownerUid = req.user.uid;
    const { preset, widthMm, heightMm, diameterMm } = req.query;

    // 1. Fetch item + ownership check
    const item = await getItemForLabel(itemId, ownerUid);

    if (item === null) {
      return res.status(404).json({ error: "ITEM_NOT_FOUND" });
    }

    if (item === "FORBIDDEN") {
      return res.status(403).json({ error: "FORBIDDEN" });
    }

    // 2. Generate PDF
    const pdfBuffer = await generateLabel(item, {
      preset,
      widthMm,
      heightMm,
      diameterMm
    });

    // 3. Send PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="label-${itemId}.pdf"`
    );

    return res.send(pdfBuffer);
  } catch (err) {
    console.error("Label PDF error:", err);
    return res.status(500).json({ error: "PDF_GENERATION_FAILED" });
  }
}

module.exports = {
  downloadLabelPdf
};