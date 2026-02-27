import React, { useContext } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import logoWide from "../../assets/Neverlose-Wide.svg";
import "./MainLayout.css";
import userIcon from "../../assets/avatar.svg";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children, username = "{UserName}" }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
      style={{
        backgroundColor: "var(--nl-deep-blue)",
        width: "40px",
        height: "40px",
        cursor: "pointer",
      }}
    >
      <img src={userIcon} alt="User" style={{ width: "79%", height: "79%" }} />
    </div>
  ));

  const handleHome = () => navigate("/dashboard");

  return (
    <Container className="mt-4">
      <div className="bg-white rounded-4 shadow-sm p-4">
        <Row className="align-items-center mb-4">
          <Col xs={6}>
            <div className="d-flex align-items-center text-primary fw-bold">
              <img
                alt="Neverlose Logo"
                src={logoWide}
                // width="30"
                height="40"
                className="me-2"
                onClick={handleHome}
                style={{ cursor: "pointer" }}
              />
            </div>
          </Col>
          <Col
            xs={6}
            className="text-end d-flex align-items-center justify-content-end"
          >
            <span className="me-3 fw-medium text-secondary">
              Hi, {username}
            </span>

            <Dropdown align="end">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              />

              <Dropdown.Menu
                className="shadow border-0"
                style={{ minWidth: "35px" }}
              >
                <Dropdown.Item
                  onClick={logout}
                  className="text-primary fw-bold"
                  style={{ fontSize: "14px" }}
                >
                  <i className="bi bi-box-arrow-right"></i> Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <div
          className="rounded-4 p-4"
          style={{ backgroundColor: "var(--nl-deep-blue)", minHeight: "400px" }}
        >
          {children}
        </div>
      </div>
    </Container>
  );
};

export default MainLayout;
