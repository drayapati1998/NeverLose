import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";

function Step2Verification({ reportData, setReportData, onSubmit, onBack }) {
  const [errors, setErrors] = useState({});
  const update = (field, value) =>
    setReportData((prev) => ({ ...prev, [field]: value }));

  const updateFinder = (field, value) =>
    setReportData((prev) => ({
      ...prev,
      finder: { ...prev.finder, [field]: value },
    }));
  const validate = () => {
    let newErrors = {};
    if (!reportData.finder.email) {
      newErrors.email = "Email is required";
    }
    if (!reportData.message) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit();
  };

  return (
    <div
      className="container py-5 px-4 bg-white rounded-4 shadow-sm"
      style={{ maxWidth: "700px" }}
    >
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4 mb-2 text-dark">
          Reach out to the owner
        </h1>
        <p className="text-muted fs-5">
          Share where the item is or how they can get it back.
        </p>
      </div>

      <div className="px-md-4">
        <label
          className="d-block fw-bold small text-uppercase mb-4"
          style={{ color: "#ff8a75", letterSpacing: "1px" }}
        >
          Contact Information
        </label>

        <div className="vstack gap-4">
          {/* Email Row */}
          <div className="row align-items-center">
            <div className="col-md-4">
              <label className="fw-bold text-dark">
                <span className="text-danger me-1">*</span>Your Email:
              </label>
            </div>
            <div className="col-md-8">
              <input
                type="email"
                className="form-control bg-light border-0 p-3 rounded-3 shadow-sm"
                placeholder="Enter your email"
                value={reportData.finder.email}
                onChange={(e) => updateFinder("email", e.target.value)}
              />
            </div>
          </div>

          {/* Message */}
          <div className="row align-items-start">
            <div className="col-md-4 pt-2">
              <label className="fw-bold text-dark">
                <span className="text-danger me-1">*</span>Message:
              </label>
            </div>
            <div className="col-md-8">
              <textarea
                className="form-control bg-light border-0 p-3 rounded-3 shadow-sm"
                placeholder="Ex: I left it with the security guard at..."
                rows={4}
                value={reportData.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="row align-items-center">
            <div className="col-md-4">
              <label className="fw-bold text-dark">
                <span className="text-danger me-1">*</span>Found at (Location):
              </label>
            </div>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control bg-light border-0 p-3 rounded-3 shadow-sm"
                placeholder="Central Park, near the fountain"
                value={reportData.foundLocationText}
                onChange={(e) => update("foundLocationText", e.target.value)}
              />
            </div>
          </div>

          {/* Optional Info */}
          <div className="row align-items-center">
            <div className="col-md-4">
              <label className="fw-bold text-secondary small">
                Name and phone (Optional)
              </label>
            </div>
            <div className="col-md-8">
              <div className="row g-2">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control bg-light border-0 p-3 rounded-3 shadow-sm"
                    placeholder="Name"
                    value={reportData.finder.name || ""}
                    onChange={(e) => updateFinder("name", e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control bg-light border-0 p-3 rounded-3 shadow-sm"
                    placeholder="Phone"
                    value={reportData.finder.phone || ""}
                    onChange={(e) => updateFinder("phone", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <CustomButton variant="outline" onClick={onBack}>
            Back
          </CustomButton>
          <CustomButton onClick={onSubmit} variant="primary">
            Send Notification to Owner
          </CustomButton>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-muted small mt-4 px-4">
          We'll keep your data secure. The owner will be notified immediately.
        </p>
      </div>
    </div>
  );
}
export default Step2Verification;
