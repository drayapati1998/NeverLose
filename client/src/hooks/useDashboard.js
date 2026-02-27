import { useState, useEffect } from "react";
import itemApi from "../api/itemApi";
import { useNavigate } from "react-router-dom";

export const useDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await itemApi.list();

        const rawData = res.data || [];
        const normalized = Array.isArray(rawData)
          ? rawData
          : rawData.items || [];

        setItems(normalized);
      } catch (err) {
        console.error("Failed to load items:", err);
        setError("Could not sync with the database.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCreate = () => navigate("/create-item");
  const handleDetail = (id) => navigate(`/item/${id}`);

  return { items, loading, error, handleCreate, handleDetail };
};
