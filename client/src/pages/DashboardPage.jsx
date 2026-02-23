import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
import Dashboard from "../Components/dashboard/Dashboard";
function DashboardPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
   <div><Dashboard/></div>
  );
}

export default DashboardPage;