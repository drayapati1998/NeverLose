import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AuthLayout.css";
import logo from "../../assets/Neverlose-Main.svg";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card
        className="auth-card border-0 shadow-lg overflow-hidden"
        style={{ maxWidth: "900px" }}
      >
        <Row className="g-0">
          <Col
            md={6}
            className="card-left d-flex flex-column align-items-center justify-content-center p-5"
          >
            <div className="z-index-1 d-flex flex-column align-items-center ">
              <img
                src={logo}
                alt="Neverlose Logo"
                className="mb-3"
                style={{ width: "250px" }}
              />
              <p className="text-muted text-center">
                Bridging the Gap Between Lost and Found
              </p>
            </div>
          </Col>
          <Col md={6} className="p-5">
            <header className="auth-header text-center mb-4">
              {title && <h1>{title}</h1>}
              {subtitle && <p className="text-muted">{subtitle}</p>}
            </header>
            {children}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default AuthLayout;
