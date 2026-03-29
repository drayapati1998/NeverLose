import React from "react";

export default function ConfirmDialog({
  open,
  message,
  onConfirm,
  onCancel,
  title,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed-top w-100 h-100 d-flex align-items-center justify-content-center px-3"
      style={{
        backgroundColor: "rgba(9, 32, 121, 0.6)",
        backdropFilter: "blur(9px)",
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="bg-white p-4 shadow-lg border-0 text-center animate__animated animate__fadeInUp"
        style={{
          maxWidth: "340px",
          width: "100%",
          borderRadius: "28px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
        }}
      >
        {/* Icon */}
        <div className="mb-3">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center"
            style={{ width: "60px", height: "60px" }}
          >
            <i className="bi bi-cloud-arrow-down-fill text-primary fs-3"></i>
          </div>
        </div>

        <h4
          className="fw-bold mb-2"
          style={{ color: "#092079", fontSize: "1.25rem" }}
        >
          {title}
        </h4>

        <p className="text-muted mb-4 small px-1" style={{ lineHeight: "1.4" }}>
          {message}
        </p>

        <div className="vstack gap-2 px-2">
          <button
            onClick={onConfirm}
            className="btn btn-primary rounded-pill py-2 fw-bold w-100 border-0 shadow-sm"
            style={{ backgroundColor: "#0c6dff", fontSize: "0.9rem" }}
          >
            Confirm
          </button>

          <button
            onClick={onCancel}
            className="btn btn-link text-muted text-decoration-none fw-bold w-100 py-1 small"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
