import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import bannerHero from "../../assets/Founder.jpg";

const Step3Success = () => {
  return (
    <div
      className="card border-0 overflow-hidden shadow-lg mt-3 mx-4 rounded-4 mb-4 animate__animated animate__zoomIn"
      style={{ borderRadius: "24px", background: "var(--nl-white)" }}
    >
      {/* Banner */}
      <div className="position-relative" style={{ height: "200px" }}>
        <img
          src={bannerHero}
          alt="Hero Banner"
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div>
        {/* Contenido de Texto */}
        <div className="card-body pt-4 py-4 pt-md-5 text-center">
          <h2
            className="fw-800 mb-2"
            style={{
              color: "var(--nl-dark-navy)",
              fontFamily: "var(--font-titles)",
            }}
          >
            You're a Hero!
          </h2>
          <h3
            className="h4 fw-bold mb-4"
            style={{ color: "var(--nl-dark-navy)" }}
          >
            You've done something great today.
          </h3>

          <p
            className="text-muted mx-auto mb-1"
            style={{ maxWidth: "700px", fontSize: "1.1rem" }}
          >
            The owner has been notified. Your kindness just made someone’s day
            much better. They will contact you soon to coordinate the recovery.
          </p>
        </div>

        {/* Call to Action */}
        <hr className="my-4 opacity-10" />
        <div className="d-flex flex-column flex-md-row gap-3 my-4 justify-content-center">
          <CustomButton variant="primary" className="px-5">
            Join the community
          </CustomButton>
          <CustomButton variant="outline" className="px-5">
            Learn more
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Step3Success;
