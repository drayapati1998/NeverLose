import React, { useState } from "react";
import { Link } from "react-router-dom"; //importing link to use in login button
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import CustomButton from "../components/CustomButton/CustomButton";

function LoginPage() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    console.log("Login Data:", { email, password });
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to manage protected items and check your activity"
    >
      <form onSubmit={handleLogin} className="d-grid gap-3">
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <h6 className="text-end small text-muted" style={{ cursor: "pointer" }}>
          Forgot your password?
        </h6>

        <CustomButton type="submit" variant="primary">
          Login
        </CustomButton>

        <h6 className="text-center mt-3">
          Don't have an account?{"  "}
          <Link
            to="/register"
            className="text-primary fw-bold text-decoration-none"
          >
            Register
          </Link>
        </h6>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
