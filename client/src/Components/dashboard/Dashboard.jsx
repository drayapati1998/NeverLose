import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import ItemList from "../itemlist/ItemList";
import { useNavigate } from "react-router-dom";

function Dashboard() {
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

      {/*<h3>Create Item</h3>
      <ItemForm />*/}

      <h3>My Items</h3>
      <ItemList />
    </div>
  );
}

export default Dashboard;