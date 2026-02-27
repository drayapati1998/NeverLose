import React, { useContext } from "react"; //
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Dashboard from "../components/dashboard/Dashboard";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const DashboardPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);

  if (authLoading) return <LoadingSpinner message="Authenticating..." />;

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="container mt-4">
        <Dashboard />
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
