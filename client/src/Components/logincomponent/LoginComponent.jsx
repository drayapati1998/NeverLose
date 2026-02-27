import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useLogin } from "../../hooks/useLogin";
import "./LoginComponent.css";

function LoginComponent({ onSuccess }) {
  const { email, setEmail, password, setPassword, status, handleLogin } =
    useLogin(onSuccess);

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
