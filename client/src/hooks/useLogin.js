import { useState } from "react";
import { login } from "../services/authService";

export const useLogin = (onSuccess) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setStatus("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setStatus("Please enter a valid email address");
      return;
    }

    if (cleanPassword.length < 6) {
      setStatus("Password must be at least 6 characters long");
      return;
    }
    try {
      setStatus("");
      await login({
        email: cleanEmail,
        password: cleanPassword,
      });

      onSuccess && onSuccess();
    } catch (err) {
      setStatus(err.response?.data?.error || err.message || "Login failed");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    status,
    handleLogin,
  };
};
