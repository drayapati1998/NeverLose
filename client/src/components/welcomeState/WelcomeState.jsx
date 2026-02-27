import React, { useContext } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const WelcomeState = ({ onCreateClick }) => {
  const { user } = useContext(AuthContext);
  const displayName = user?.displayName || "User";

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100%" }}
    >
      <div className="text-center py-5 px-4 bg-white rounded-4 shadow-sm w-100">
        <h1 className="fw-bold text-nl-dark mb-2">Hello, {displayName}!</h1>
        <h2 className="fw-light text-nl-dark mb-5">Let’s secure your world</h2>

        <div className="d-flex justify-content-center gap-1 mb-5 flex-wrap">
          <div className="text-center p-2" style={{ flex: "1 1 150px" }}>
            <h5 className="fw-bold">Step 1</h5>
            {/* <img
            alt=""
            src={}
            width="30"
            height="40"
            className="me-2"
          /> */}
            <p className="small text-muted">Register your favorite items</p>
          </div>
          <div className="text-center p-2" style={{ flex: "1 1 150px" }}>
            <h5 className="fw-bold">Step 2</h5>
            {/* <img
            alt=""
            src={}
            width="30"
            height="40"
            className="me-2"
          /> */}
            <p className="small text-muted">Print your unique QR code</p>
          </div>
          <div className="text-center p-2" style={{ flex: "1 1 150px" }}>
            <h5 className="fw-bold">Step 3</h5>
            {/* <img
            alt=""
            src={}
            width="30"
            height="40"
            className="me-2"
          /> */}
            <p className="small text-muted">
              Attach it and enjoy peace of mind
            </p>
          </div>
        </div>

        <CustomButton
          onClick={onCreateClick}
          variant="primary"
          className="px-5"
        >
          Add New Item
        </CustomButton>
      </div>
    </Container>
  );
};

export default WelcomeState;
