import React from "react";
import RegisterComponent from "../components/registercomponent/RegisterComponent";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

function SignupPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Join the community"
      subtitle="Secure your essentials and gain peace of mind"
    >
      <RegisterComponent onSuccess={() => navigate("/login")} />
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
}

export default SignupPage;
