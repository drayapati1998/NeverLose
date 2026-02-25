import React, { useState } from "react";
import { signup } from "../../services/authService";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Link } from "react-router-dom"; //importing link to use in register button
import "./RegisterComponent.css";

function RegisterComponent({ onSuccess }) {
  //const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [status, setStatus] = useState("");

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button clicked");
    if (!fullname || !email || !password || !confirmpassword) {
      alert("All fields are required");
      return;
    }
    if (!strongPassword.test(password)) {
      alert(
        "password must be minimum 8 characters and include uppercase,lowercase,number and special character",
      );
      return;
    }
    if (password !== confirmpassword) {
      alert("passwords dont match");
      return;
    }
    try {
      console.log(
        `email = ${email} fullname = ${fullname} password= ${password}`,
      );
      await signup({
        name: fullname,
        email: email,
        password: password,
      });

      setStatus("Signup successful. You can now log in.");
      onSuccess && onSuccess();
    } catch (err) {
      setStatus(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="d-grid gap-3">
      <div className="form-group text-start"></div>
      <label className="form-label fw-bold" htmlFor="fullname">
        Fullname:
      </label>
      <input
        type="text"
        id="fullname"
        className="form-control"
        placeholder="Enter your full name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <div className="form-group text-start">
        <label className="form-label fw-bold" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group text-start">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Minimum of 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group text-start">
        <label htmlFor="confirm password">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="confirmpassword"
          placeholder="Repeat the same password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
      </div>

      <CustomButton type="submit" variant="primary">
        Sign Up
      </CustomButton>

      {status && <p className="text-center mt-2 small text-info">{status}</p>}

      {/*<h6>Already have an account?<Link to='/login'>Login here</Link></h6>*/}
    </form>
  );
}

export default RegisterComponent;
