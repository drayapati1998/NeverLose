import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout/MainLayout";
import WelcomeState from "../components/welcomeState/WelcomeState";
// import ItemsListState from './ItemsListState';
import ItemsList from "../components/itemlist/ItemList";
import itemApi from "../api/itemApi";

const DashboardPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    itemApi.list().then((res) => {
      setItems(res.data || []);
      setLoading(false);
    });
  }, []);

  const handleCreate = () => {};

  return (
    <MainLayout username="Sarah">
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : items.length === 0 ? (
        <WelcomeState username="Sarah" onCreateClick={handleCreate} />
      ) : (
        <ItemsList items={items} onCreateClick={handleCreate} />
      )}
    </MainLayout>
  );
};

export default DashboardPage;
