import React from "react";
import ItemsList from "../itemsList/ItemsList";
import WelcomeState from "../welcomeState/WelcomeState";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { useDashboard } from "../../hooks/useDashboard";

function Dashboard() {
  const {
    items,
    loading: itemsLoading,
    handleCreate,
    handleDetail,
  } = useDashboard();

  if (itemsLoading) return <LoadingSpinner message="Fetching your items..." />;

  if (items.length === 0) {
    return <WelcomeState onCreateClick={handleCreate} />;
  }

  return (
    <ItemsList
      items={items}
      onCreateClick={handleCreate}
      onDetailClick={handleDetail}
    />
  );
}

export default Dashboard;
