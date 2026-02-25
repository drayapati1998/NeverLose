import React from "react";
import LoginComponent from "../components/logincomponent/LoginComponent";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Login"
      subtitle="Welcome back! Please enter your details."
    >
      <LoginComponent onSuccess={() => navigate("/")} />
      <p className="text-center mt-3">
        No account?{" "}
        <Link
          to="/signup"
          className="text-primary fw-bold text-decoration-none"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
