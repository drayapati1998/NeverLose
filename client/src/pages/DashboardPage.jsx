import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";

function DashboardPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

export default DashboardPage;
