import React from "react";
import "./Founder.css";
import { Container, Row, Col } from "react-bootstrap";
import FinderFormImage from "../../assets/Neverlose-Wide.svg";
import NavBar from "../../components/navbar/NavBar";

export default function Founder({ right }) {
  return (
    <div className="min-vh-100 bg-light">
      <NavBar />

      <Container className="py-5">
        <div className="bg-white rounded-4 shadow-sm overflow-hidden border">
          <Row className="g-4">
            {" "}
            {/* Left side */}
            <Col md={5} className="d-none d-md-block">
              <div
                className="h-100 position-relative"
                style={{ minHeight: "600px" }}
              >
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-5">
                  <img
                    src={FinderFormImage}
                    alt=""
                    className="img-fluid"
                    style={{ maxWidth: "80%", opacity: "0.9" }}
                  />

                  <div className="position-absolute bottom-0 start-0 w-100 p-5 text-white text-center">
                    <p className="fs-4 fw-light italic">
                      "Helping things find their way home."
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            {/* Right side */}
            <Col md={7} className="p-4 p-lg-5 d-flex align-items-center">
              <div className="w-100">{right}</div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
