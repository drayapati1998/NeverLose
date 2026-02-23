import React, { useEffect, useState } from "react";
import itemApi from "../../api/itemApi";

function ItemList() {
  const [items, setItems] = useState(null); // null = not loaded yet
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    setLoading(true);
    setStatus("");

    try {
      const data = await itemApi.list();
      console.log("ITEMS RESPONSE:", data);

      // Normalize response
      const normalized = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
        ? data.items
        : [];

      setItems(normalized);
    } catch (err) {
      setStatus(err.response?.data?.error || "Failed to load items");
      setItems([]); // treat error as empty list
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <button onClick={loadItems}>Refresh</button>

      {loading && <p>Loading items...</p>}
      {status && <p style={{ color: "red" }}>{status}</p>}

      {!loading && items?.length === 0 && !status && (
        <p>No items found</p>
      )}

      {!loading && items?.length > 0 && (
        <ul>
          {items.map((i) => (
            <li key={i.id}>
              <strong>{i.nickname}</strong> — {i.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;