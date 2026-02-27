import { useState, useEffect } from "react";
import itemApi from "../api/itemApi";
import { useNavigate } from "react-router-dom";

export const useDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const res = await itemApi.list();

        //Data normalization ensures we always work with an array even if the API structure changes
        const rawData = res.data || [];
        const normalized = Array.isArray(rawData)
          ? rawData
          : rawData.items || [];

        setItems(normalized.length > 0 ? normalized : getMockData());
      } catch (err) {
        setError("Unable to sync with the server. Showing offline demo data.");
        setItems(getMockData());
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const getMockData = () => [
    {
      id: "1",
      nickname: "MacBook Pro 14",
      status: "Active",
      lastActivity: "2 hours ago",
      description: "Electronics",
    },
    {
      id: "2",
      nickname: "Blue Travel Backpack",
      status: "Lost",
      lastActivity: "Yesterday at 14:30",
      description: "Travel",
    },
    {
      id: "3",
      nickname: "Gym Keys",
      status: "Active",
      lastActivity: "3 days ago",
      description: "Personal",
    },
    {
      id: "4",
      nickname: "Passport Holder",
      status: "Active",
      lastActivity: "Oct 12, 2023",
      description: "Documents",
    },
  ];

  const handleCreate = () => navigate("/create-item");
  const handleDetail = (id) => navigate(`/item/${id}`);

  return { items, loading, error, handleCreate, handleDetail };
};
