// services/labelService.js
// Generates printable QR label PDFs for items. This service handles:
// - Ownership validation
// - QR code generation
// - PDF streaming with correct physical dimensions

const { ItemService } = require("./itemService");
const { generateQrDataUrl } = require("../utils/qr");
const { streamLabelPdf } = require("../utils/pdfGenerator");

// Base URL for public "found it" pages.
const PUBLIC_BASE_URL = process.env.HOST_URL || "http://localhost:3000";

exports.LabelService = {
  // Generates and streams a PDF label for a specific item.
  async generateLabelPdfForItem({
    ownerId,
    itemId,
    preset,
    widthMm,
    heightMm,
    diameterMm,
    res,
  }) {
    // Ensure item exists and belongs to the authenticated owner.
    const item = await ItemService.getItemByIdForOwner(itemId, ownerId);
    if (!item) {
      throw new Error("Item not found or access denied");
    }

    // Public scan URL encoded in the QR code.
    const scanUrl = `${PUBLIC_BASE_URL}/f/${item.token}`;

    // Generate QR code as a data URL.
    const qrDataUrl = await generateQrDataUrl(scanUrl);

    // Stream PDF directly to the HTTP response.
    await streamLabelPdf(res, {
      preset,
      custom: { widthMm, heightMm, diameterMm },
      qrDataUrl,
      scanUrl,
    });
  },
};