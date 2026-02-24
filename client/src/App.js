import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
//import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateItemPage from "./pages/CreateItemPage";
import QRCodePage from "./pages/QRCodePage";
import PublicScan from "./pages/PublicScan";
import SignupPage from "./pages/SignupPage";
//import DashboardPage from "./pages/DashboardPage";
//import FoundReport from "./pages/FoundReport";


function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/f/:token" element={<PublicScan />} />

          <Route path="/" element={<DashboardPage />} />
          <Route path="/create" element={<CreateItemPage />} />
          <Route path="/label/:itemId" element={<QRCodePage />} />
          
         
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
