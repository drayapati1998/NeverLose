// controllers/labelsController.js
// Generates printable QR label PDFs for items owned by the authenticated user.
// The controller delegates all logic to LabelService.

const { LabelService } = require("../services/labelService");

exports.getLabel = async (req, res) => {
  try {
    const ownerId = req.user.uid;
    const { itemId } = req.params;

    // Default preset is "wallet" unless specified
    const preset = req.query.preset || "wallet";

    // Optional custom dimensions
    const widthMm = req.query.widthMm ? Number(req.query.widthMm) : undefined;
    const heightMm = req.query.heightMm ? Number(req.query.heightMm) : undefined;
    const diameterMm = req.query.diameterMm ? Number(req.query.diameterMm) : undefined;

    // Streams PDF directly to response
    await LabelService.generateLabelPdfForItem({
      ownerId,
      itemId,
      preset,
      widthMm,
      heightMm,
      diameterMm,
      res,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};