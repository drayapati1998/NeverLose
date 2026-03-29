import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import UploadPhoto from "../uploadPhoto/UploadPhoto";

export default function Step1ItemPreview({
  item,
  onNext,
  answer,
  photoUrl,
  seturl,
  setAnswer,
}) {
  return (
    <div
      className="container py-5 px-4 bg-white rounded-4 shadow-sm"
      style={{ maxWidth: "800px" }}
    >
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4 mb-2 text-dark">
          You found a lost item!
        </h1>
        <p className="text-muted fs-5">
          Help us verify it by answering this quick question from the owner.
        </p>
      </div>

      <div className="row g-4 g-md-5 align-items-center">
        {/* Left Side: Question & Input */}
        <div className="col-md-7">
          <div className="mb-4">
            <label className="d-block text-danger-emphasis fw-bold small text-uppercase mb-2">
              Owner's Question
            </label>
            <h5 className="fw-bold text-dark mb-3">
              <span className="text-danger me-1">*</span>
              {item.verificationQuestion || "What color is the keychain?"}
            </h5>

            <textarea
              className="form-control bg-light border-0 p-3 fs-6 rounded-3 shadow-sm"
              rows="4"
              placeholder="Your Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </div>

        {/* Right Side: Photo Upload */}
        <div className="col-md-5 text-center">
          <div className="mb-3">
            <span className="badge rounded-pill bg-light text-dark border px-3 py-2 fw-medium">
              Reporting: {item.nickname || "Item"}
            </span>
          </div>

          <div className="w-100 rounded-4 overflow-hidden shadow-sm">
            <UploadPhoto
              photoUrl={photoUrl}
              onUploaded={(url) => seturl({ url })}
            />
          </div>
          <p className="text-muted small mt-2">
            Click to upload a photo (optional)
          </p>
        </div>

        {/* CTA */}
        <div className="col-12 mt-4">
          {item.status === "CLOSED" ? (
            <div className="alert alert-danger rounded-pill text-center fw-bold">
              This tag is inactive.
            </div>
          ) : (
            <CustomButton
              className="text-end pb-2"
              variant="primary"
              onClick={onNext}
            >
              Next: Contact Info
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
}
