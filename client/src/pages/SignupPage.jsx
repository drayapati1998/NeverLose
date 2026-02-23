import React from "react";
import RegisterComponent from "../Components/registercomponent/RegisterComponent";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Sign Up</h2>
      <RegisterComponent onSuccess={() => navigate("/login")} />
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default SignupPage;