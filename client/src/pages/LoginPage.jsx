import React from "react";
import LoginComponent from "../Components/logincomponent/LoginComponent";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Login</h2>
      <LoginComponent onSuccess={() => navigate("/dashboard")} />
      <p>No account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default LoginPage;