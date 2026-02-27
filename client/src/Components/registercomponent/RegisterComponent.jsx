import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useSignup } from "../../hooks/useSignUp";
import "./RegisterComponent.css";

function RegisterComponent({ onSuccess }) {
  const {
    status,
    fullname,
    setFullname,
    email,
    setEmail,
    password,
    setPassword,
    confirmpassword,
    setConfirmpassword,
    handleSubmit,
  } = useSignup(onSuccess);

  return (
    <form onSubmit={handleSubmit} className="d-grid gap-3" noValidate>
      <div className="form-group text-start">
        <label className="form-label fw-bold">Fullname:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>

      <div className="form-group text-start">
        <label className="form-label fw-bold">Email:</label>
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
          placeholder="Minimum of 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group text-start">
        <label className="form-label fw-bold">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Repeat the same password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
      </div>

      <CustomButton type="submit" variant="primary">
        Sign Up
      </CustomButton>

      {status && <p className="text-center mt-2 small text-info">{status}</p>}

      <p className="text-center mt-1 small">
        Already have an account?{" "}
        <Link to="/login" className="text-primary fw-bold text-decoration-none">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterComponent;
