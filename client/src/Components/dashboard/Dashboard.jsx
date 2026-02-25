import React, { useContext,useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import ItemForm from "../item/ItemForm";
import ItemList from "../itemlist/ItemList";
import { useNavigate } from "react-router-dom";
import itemApi from "../../api/itemApi";
function Dashboard() {
  const [items, setItems] = useState([]);
  //const navigate = useNavigate();

  useEffect(() => {
  const fetchItems = async () => {
    try {
      const res = await itemApi.list();
      setItems(res);
    } catch (err) {
      console.error("Failed to load items:", err);
    }
  };

  fetchItems();
}, []);


  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Logged in as: {user.email}</p>
      <button onClick={logout}>Logout</button>

        <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Items</h1>

        <button
          onClick={() => navigate("/create")}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Create New Item
        </button>
      </div>

      { !items || items.length === 0 ? (
        <p className="text-gray-600">You haven't created any items yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <ItemList key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>


     
    </div>
  );
}

export default Dashboard;