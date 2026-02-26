import React, { useState } from "react";
import { signup } from "../../services/authService";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Link } from "react-router-dom"; //importing link to use in register button
import "./RegisterComponent.css";

function RegisterComponent({ onSuccess }) {
  const [status, setStatus] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(""); // clear previous texts

    const cleanName = fullname.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password || !confirmpassword) {
      setStatus("All fields are required");
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setStatus("Please enter a valid email address");
      return;
    }

    if (!strongPassword.test(password)) {
      setStatus(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
      );
      return;
    }

    if (password !== confirmpassword) {
      setStatus("Passwords don't match");
      return;
    }

    try {
      console.log(
        `email = ${email} fullname = ${fullname} password= ${password}`,
      );
      await signup({
        name: cleanName,
        email: cleanEmail,
        password: password,
      });

      setStatus("Signup successful. You can now log in.");
      onSuccess && onSuccess();
    } catch (err) {
      setStatus(err.response?.data?.error || err.message || "Signup failed");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="d-grid gap-3" noValidate>
      <div className="form-group text-start"></div>
      <label className="form-label fw-bold">Fullname:</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter your full name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
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
