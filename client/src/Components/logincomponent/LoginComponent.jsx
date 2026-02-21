import React, { useState } from "react";
import {Link} from "react-router-dom";//importing link to use in login button
import "./LoginComponent.css";


function LoginComponent() {
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
    <div className="container">
      <div className="login-card">

        <h2>Welcome!</h2>
        <h5>Sign in to manage protected items and check your activity</h5>

        <form onSubmit={handleLogin}>
        <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Login</button>
          <h6>Forgot your password?</h6>
          <h6>Don't have an account?<Link to ='/register'>Register Neverlose</Link></h6>
        </form>

      </div>
    </div>
  );
}

export default LoginComponent;
