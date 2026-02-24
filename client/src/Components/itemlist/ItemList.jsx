import React, { useEffect, useState } from "react";
import itemApi from "../../api/itemApi";
import { useNavigate } from "react-router-dom";

function ItemList(item) {
  const navigate = useNavigate();


  /*const [items, setItems] = useState(null); // null = not loaded yet
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
  }, []);*/

  return (
     <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{item.nickname}</h3>

        <span
          className={`px-2 py-1 text-xs rounded ${
            item.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {item.status}
        </span>
      </div>

      {item.description && (
        <p className="text-gray-600 mt-1">{item.description}</p>
      )}

      <div className="mt-3 text-sm">
        <p>
          <strong>Last Activity:</strong>{" "}
          {item.lastActivityAt ? item.lastActivityAt : "No activity yet"}
        </p>

        <p className="mt-1">
          <strong>Scan URL:</strong>{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
            {item.publicScanUrl}
          </code>
        </p>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigate(`/label/${item.id}`, { state: item })}
          className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
        >
          View Label
        </button>

        <button
          onClick={() => navigate(`/items/${item.id}`)}
          className="px-3 py-2 bg-gray-200 rounded text-sm"
        >
          Details
        </button>
      </div>
    </div>
  );
}


export default ItemList;