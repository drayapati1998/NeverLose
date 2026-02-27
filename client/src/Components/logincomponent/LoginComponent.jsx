import React, { useState } from "react";
import userApi from "../../api/userApi";
import { login } from "../../services/authService";
import { Link } from "react-router-dom";
import "./LoginComponent.css";
import CustomButton from "../../components/CustomButton/CustomButton";

function LoginComponent({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState(" ");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      await login({
        email: email,
        password: password,
      });

      onSuccess && onSuccess();
    } catch (err) {
      setStatus(err.response?.data?.error || err.message || "Login failed");
    }
  };
  return (
    <form onSubmit={handleLogin} className="d-grid gap-3">
      <div>
        <label>Email Address</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
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

      {status && <p className="text-danger small text-center mt-2">{status}</p>}

      <p className="text-center mt-3 small">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-primary fw-bold text-decoration-none"
        >
          Register Neverlose
        </Link>
      </p>
    </form>
  );
}

export default LoginComponent;
