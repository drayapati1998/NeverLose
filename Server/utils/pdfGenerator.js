// Generates a small PDF containing a QR code for the item's public URL.
// Supports different size presets (wallet, airtag, smalltag, custom).

const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

const MM_TO_PT = 2.83465; // millimeters to points conversion

async function generateLabelPdf({ preset, token, widthMm, heightMm, diameterMm }) {
  // Public scan URL that the QR code should point to.
  const url = `${process.env.HOST_URL}/f/${token}`;

  // Generate QR code as a data URL (PNG).
  const qrDataUrl = await QRCode.toDataURL(url, { margin: 1 });
  const qrBuffer = Buffer.from(qrDataUrl.split(",")[1], "base64");

  // Default sizes based on preset.
  if (preset === "wallet") {
    widthMm = 85.6;
    heightMm = 54;
  } else if (preset === "airtag") {
    widthMm = heightMm = 32;
  } else if (preset === "small-tag") {
    widthMm = 50;
    heightMm = 20;
  } else if (preset === "custom" && diameterMm) {
    widthMm = heightMm = diameterMm;
  }
  const widthPt = widthMm * MM_TO_PT;
  const heightPt = heightMm * MM_TO_PT;

  // Create a PDF document sized to the label.
  const doc = new PDFDocument({
    size: [widthPt, heightPt],
    margin: 5
  });

  const chunks = [];
  doc.on("data", chunk => chunks.push(chunk));

  const done = new Promise(resolve => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });
 // Draw circle outline for AirTag
  if (preset === "airtag") {
    const radius = (widthPt - 10) / 2;
    const centerX = widthPt / 2;
    const centerY = heightPt / 2;

    doc.circle(centerX, centerY, radius).stroke("#000");
  }


  // Draw QR code centered on the label.
  doc.image(qrBuffer, {
    fit: [widthMm * MM_TO_PT - 10, heightMm * MM_TO_PT - 20],
    align: "center",
    valign: "center"
  });

  // Optional: print the URL under the QR code.
  doc.moveDown();
  doc.fontSize(8).text(url, { align: "center" });

  doc.end();
  return done;
}

module.exports = { generateLabelPdf };