// src/api/axiosClient.js
import axios from "axios";
import { auth } from "../config/firebaseConfig";
const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log(`API_BASE_URL:${API_BASE_URL}`);
// Axios instance
const axiosClient = axios.create({
  baseURL:  API_BASE_URL, // Proxy in package.json will forward to backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach Firebase ID token to every request
axiosClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;