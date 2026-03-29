import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ItemsList from "../itemsList/ItemsList";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useDashboard } from "../../hooks/useDashboard";
import WelcomeState from "../welcomeState/WelcomeState";
import { useEffect } from "react";
import CustomButton from "../CustomButton/CustomButton";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import NavBar from "../navbar/NavBar";

function Dashboard() {
  const {
    items,
    loading: itemsLoading,
    handleCreate,
    handleItemDetails,
    handleReportsList,
  } = useDashboard();
  const { user, loading: authLoading } = useContext(AuthContext); // Get authLoading

  /*function Dashboard() {
  const {
    itemsWithReports,
    loading,
    handleCreate,
    handleItemDetails,
    handleReportsList,
  } = useDashboard();
  const { user } = useContext(AuthContext);*/
  const navigate = useNavigate();

  // 1. Wait for Auth to finish initialization
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // 2. While checking auth, show a loader (don't redirect yet!)
  if (authLoading) {
    return <div className="text-white text-center">Checking session...</div>;
  }

  // 3. If no user, return null while the useEffect redirect kicks in
  if (!user) return null;

  return (
    <>
      <NavBar />
      <MainLayout username={user?.displayName || "User"}>
        <div fluid className="px-0">
          {itemsLoading ? (
            <LoadingSpinner />
          ) : !items || items.length === 0 ? (
            <WelcomeState onCreateClick={handleCreate} />
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                <h2 className="text-white fw-bold mb-0">My Secure Tags</h2>
                <CustomButton
                  onClick={handleCreate}
                  variant="secondary"
                  className=" px-4"
                >
                  Add New Item
                </CustomButton>
              </div>

              <ItemsList
                items={items}
                onCreateClick={handleCreate}
                onItemDetails={handleItemDetails}
                onReportsList={handleReportsList}
              />
            </>
          )}
        </div>
      </MainLayout>
    </>
  );
}

export default Dashboard;
