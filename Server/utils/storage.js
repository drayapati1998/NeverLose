// lib/storage.js
// Provides a helper to upload files to Firebase Storage and return a public URL.

const admin = require("../config/firebaseConfig")
const { v4: uuidv4 } = require("uuid");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // e.g. "myapp.appspot.com"
  });
}

const bucket = admin.storage().bucket();

exports.uploadFileToStorage = async (fileBuffer, fileName, mimeType) => {
  const uniqueName = `${Date.now()}-${fileName}`;
  const file = bucket.file(uniqueName);

  const uuid = uuidv4();

  await file.save(fileBuffer, {
    metadata: {
      contentType: mimeType,
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    },
  });

  // Public download URL
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
    uniqueName
  )}?alt=media&token=${uuid}`;
};