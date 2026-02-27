import React from "react";
import MainLayout from "../layouts/MainLayout/MainLayout";
import WelcomeState from "../components/welcomeState/WelcomeState";
import ItemsList from "../components/itemsList/ItemsList";
import { useDashboard } from "../hooks/useDashboard";

const DashboardPage = () => {
  // Destructure everything we need from our custom logic hooks
  const { items, loading, handleCreate, handleDetail } = useDashboard();

  return (
    <MainLayout username="Sarah">
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : items.length === 0 ? (
        <WelcomeState username="Sarah" onCreateClick={handleCreate} />
      ) : (
        <ItemsList
          items={items}
          onCreateClick={handleCreate}
          onDetailClick={handleDetail}
        />
      )}
    </MainLayout>
  );
};

export default DashboardPage;
