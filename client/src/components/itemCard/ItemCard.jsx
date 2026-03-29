import React from "react";

const ItemCard = ({ data }) => {
  if (!data) return <div className="p-3 text-muted">Loading item data...</div>;
  const { nickname, description, photoUrl, verification } = data;

  return (
    <div className="row g-5 g-lg-5 justify-content-center align-items-center">
      {/* Left Side */}
      <div className="col-md-6 d-flex flex-column align-items-center">
        <div className="review-image-wrapper mx-auto mx-md-0">
          <div className="wizard-image-box rounded-4 border overflow-hidden shadow-sm">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={nickname || "Item"}
                className="img-fluid w-100"
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light"
                style={{ minHeight: "180px" }}
              >
                <span className="text-muted small italic">
                  No image available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="col-md-6 text-start">
        <h2 className="fw-bold mb-3 text-dark" style={{ fontSize: "1.8rem" }}>
          {nickname || "Unnamed Item"}
        </h2>
        <p
          className="text-muted mb-4"
          style={{ lineHeight: "1.6", fontSize: "1.05rem" }}
        >
          {description || "No description provided."}
        </p>

        {/* Security Question */}
        {(verification?.enabled || data.securityQuestion) && (
          <div className="security-review-box pt-2 border-top">
            <label className="small text-muted my-1 text-uppercase fw-bold">
              Security Question:
            </label>
            <p className="fw-bold mb-1 text-dark">
              {verification?.question || data.securityQuestion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
