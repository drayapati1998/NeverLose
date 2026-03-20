import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Neverlose-Wide.svg";
import CustomButton from "../CustomButton/CustomButton";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === "/home";
  const isFinderPage =
    location.pathname.includes("/f/") || location.pathname.includes("/found/");
  const isWelcomePage = location.pathname === "/";

  const handleNavClick = (sectionId) => {
    if (isLanding) {
      // Smooth scroll
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/home");
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-white shadow-sm mt-3 mx-4 rounded-4 border sticky-top">
      <div className="container-fluid px-4 py-1">
        <Link to="/home" className="navbar-brand">
          <img src={logo} alt="Neverlose" style={{ height: "37px" }} />
        </Link>

        {/* Navigation links */}
        <div className="collapse navbar-collapse justify-content-center">
          <div className="navbar-nav gap-4">
            <button
              onClick={() => handleNavClick("how-it-works")}
              className="nav-link btn btn-link text-muted fw-medium small border-0"
            >
              How it Works
            </button>
            <button
              onClick={() => handleNavClick("features")}
              className="nav-link btn btn-link text-muted fw-medium small border-0"
            >
              Features
            </button>
            {!isFinderPage && (
              <button
                onClick={() => handleNavClick("found-an-item")}
                className="nav-link btn btn-link text-muted fw-medium small border-0"
              >
                Found an Item?
              </button>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="d-flex align-items-center gap-2">
          {isFinderPage ? (
            <CustomButton
              variant="primary"
              className="btn-sm px-3"
              onClick={() => navigate("/signup")}
            >
              Get Started Free
            </CustomButton>
          ) : (
            <>
              <CustomButton
                variant="outline"
                className="btn-sm px-3"
                onClick={() => navigate("/login")}
              >
                Log In
              </CustomButton>
              <CustomButton
                variant="primary"
                className="btn-sm px-3"
                onClick={() => navigate("/signup")}
              >
                Register
              </CustomButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
