import { useState, useEffect } from "react";
import uploadApi from "../../api/uploadApi";
import imageCompression from "browser-image-compression"; //
import "../item/ItemForm.css";

function UploadPhoto({ photoUrl, onUploaded }) {
  const [preview, setPreview] = useState(photoUrl || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (photoUrl) setPreview(photoUrl);
  }, [photoUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);

      // This protects against uploading photos larger than 10MB
      // by compressing them before uploading.
      const options = {
        maxSizeMB: 1, // Max 1MB
        maxWidthOrHeight: 1200, // Max width 1200px
        useWebWorker: true,
      };

      console.log("Compressing...");
      const compressedFile = await imageCompression(file, options);
      console.log(
        `Original: ${file.size / 1024 / 1024}MB | Compresed: ${compressedFile.size / 1024 / 1024}MB`,
      );

      // Upload the comppresed file to the API
      const url = await uploadApi.uploadPhoto(compressedFile);
      onUploaded(url);
    } catch (err) {
      console.error(err);
      alert("Failed to compress or upload photo. Please try a smaller image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-photo-container">
      {/* input hide */}
      <input
        type="file"
        id="photo-upload"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {/* Wizard-image-box clickable */}
      <label htmlFor="photo-upload" className="w-100 cursor-pointer">
        <div
          className={`wizard-image-box rounded-4 border overflow-hidden shadow-sm d-flex align-items-center justify-content-center bg-light ${uploading ? "opacity-50" : ""}`}
          style={{ minHeight: "230px", maxHeight: "40px", cursor: "pointer" }}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="img-fluid w-100 h-auto"
            />
          ) : (
            <div className="text-center p-4">
              <i className="bi bi-camera fs-1 text-muted"></i>
              <p className="text-muted small mb-0">Click to upload photo</p>
            </div>
          )}

          {uploading && (
            <div className="position-absolute d-flex flex-column align-items-center">
              <div
                className="spinner-border text-primary mb-2"
                role="status"
              ></div>
              <span className="fw-bold text-dark bg-white px-2 rounded">
                Processing...
              </span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

export default UploadPhoto;
