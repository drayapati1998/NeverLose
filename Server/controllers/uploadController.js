// controllers/uploadController.js
// Handles uploading a file to Firebase Storage and returning a public URL.

const { uploadFileToStorage } = require("../lib/storage");

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const url = await uploadFileToStorage(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    res.status(200).json({ photoUrl: url });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload file" });
  }
};