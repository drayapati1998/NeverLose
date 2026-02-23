import React, { useEffect, useState } from "react";
import itemApi from "../../api/itemApi";

function ItemList() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");

  const loadItems = async () => {
    try {
      const data = await itemApi.list();
      setItems(data);
    } catch (err) {
      setStatus(err.response?.data?.error || "Failed to load items");
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <button onClick={loadItems}>Refresh</button>
      {status && <p>{status}</p>}
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <strong>{i.nickname}</strong> — {i.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;