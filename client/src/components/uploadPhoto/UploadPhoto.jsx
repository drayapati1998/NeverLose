import { useState } from "react";
import uploadApi from "../../api/uploadApi";

export default function UploadPhoto({ onUploaded }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);
      const url = await uploadApi.uploadPhoto(file);
      onUploaded(url);
    } catch (err) {
      alert("Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label>Upload Photo</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {uploading && <p>Uploading...</p>}

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: 120, height: 120, marginTop: 10, borderRadius: 8 }}
        />
      )}
    </div>
  );
}