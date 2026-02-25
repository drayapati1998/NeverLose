import React, { useContext } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/Logo-Neverlose-Main.svg';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="main-wrapper">
      <Navbar bg="white" className="border-bottom px-4 py-2">
        <Navbar.Brand href="/"><img src={logo} alt="Logo" height="35" /></Navbar.Brand>
        <Nav className="ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" className="avatar-toggle">
              <div className="avatar-circle">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>

      <div className="blue-gradient-bg">
        <Container className="py-4">
          <div className="white-content-card shadow-lg p-4">
            {children}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MainLayout;