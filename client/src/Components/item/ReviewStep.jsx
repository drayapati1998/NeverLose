import React from "react";
import CustomButton from "../CustomButton/CustomButton";

function ReviewStep({form,back,create }) {
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "900px", width: "100%" }}>
        <h3 className="text-center fw-bold mb-4">Review Your Item</h3>
        <div className="mb-4">
          <div className="row align-items-center">
  <div className="col-md-6 text-center mb-4 mb-md-0">
    {form.photoUrl ? (
      <img
        src={form.photoUrl}
        alt="Item"
        className="img-fluid rounded-3 shadow-sm"
        style={{ maxHeight: "300px" }}/>
    ) : (
      <div
        className="border rounded-3 d-flex align-items-center justify-content-center bg-light"
        style={{ height: "250px" }}
      >
        No Image Available
      </div>
    )}
  </div>
  <div className="col-md-6">

    <div className="mb-3">
      <strong>Nickname:</strong>
      <div className="text-muted">{form.nickname || "-"}</div>
    </div>
    <div className="mb-3">
      <strong>Description:</strong>
      <div className="text-muted">{form.description || "-"}</div>
    </div>
    <div className="mb-3">
      <strong>Photo URL:</strong>
      <div className="text-muted">{form.photoUrl || "-"}</div>
    </div>
    <div className="mb-3">
      <strong>Verification Enabled:</strong>
      <div className="text-muted">
        {form.verification.enabled ? "Yes" : "No"}
      </div>
    </div>
    {form.verification.enabled && (
      <div className="mb-3">
        <strong>Security Question:</strong>
        <div className="text-muted">
          {form.verification.question}
        </div>
      </div>
    )}

  </div>

</div>              
    <div className="d-flex justify-content-between mt-4">
          <CustomButton variant="outline-secondary" onClick={back}>
            Back
          </CustomButton>
          <CustomButton variant="success" onClick={create}>
          Create Item
          </CustomButton>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ReviewStep;
