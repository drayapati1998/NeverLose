import React, { useState } from "react";
import userApi from "../../api/userApi";
import { login } from "../../services/authService";
import { Link } from "react-router-dom";
import "./LoginComponent.css";
import CustomButton from "../../components/CustomButton/CustomButton";

function LoginComponent({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setStatus("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setStatus("Please enter a valid email address");
      return;
    }

    if (cleanPassword.length < 8) {
      setStatus("Password must be at least 8 characters long");
      return;
    }
    try {
      setStatus("");
      await login({
        email: cleanEmail,
        password: cleanPassword,
      });

      onSuccess && onSuccess();
    } catch (err) {
      setStatus(err.response?.data?.error || err.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="d-grid gap-3" noValidate>
      <div className="form-group text-start">
        <label className="form-label fw-bold">Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group text-start">
        <label className="form-label fw-bold">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-end mt-1">
          <small className="text-muted" style={{ cursor: "pointer" }}>
            Forgot your password?
          </small>
        </div>
      </div>

      <CustomButton type="submit" variant="primary">
        Login
      </CustomButton>

      {status && <p className="text-info small text-center">{status}</p>}

      <p className="text-center mt-1 small">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-primary fw-bold text-decoration-none"
        >
          Register
        </Link>
      </p>
    </form>
  );
}

export default LoginComponent;
