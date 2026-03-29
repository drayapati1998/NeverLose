import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import "./ItemForm.css";
import ItemCard from "../itemCard/ItemCard";

function ReviewStep({ form, back, create, showButtons = true }) {
  const totalSteps = 3;
  const currentStep = 3;

  return (
    <div className="item-form-content">
      <h3 className="text-white text-center fw-bold mb-4 display-6">
        Review Your Item
      </h3>

      <div className="bg-white rounded-4 shadow-sm w-100 px-5 py-4">
        <div style={{ maxWidth: "900px" }} className="mx-auto">
          <p className="text-center text-muted mt-4 mb-5">
            Check if everything looks correct before securing your item.
          </p>

          <div className="pb-4">
            <ItemCard data={form} />

            {/* Buttons Bar */}
            {showButtons && (
              <div className="d-flex justify-content-between mt- pt-3">
                <CustomButton variant="outline" onClick={back}>
                  Back
                </CustomButton>
                <CustomButton variant="primary" onClick={create}>
                  Create Item
                </CustomButton>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="pb- my-4 mx-auto" style={{ maxWidth: "450px" }}>
            <div className="progress rounded-pill" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "100%" }}
              ></div>
            </div>
            <p className="mt-2 text-center small text-muted fw-medium">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewStep;
