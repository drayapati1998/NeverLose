import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

// Pages import
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import DashboardPage from "./pages/DashboardPage/DashboardPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Publir routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* home route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
