import { useState, useEffect, useContext } from "react"; // Added useContext
import itemApi from "../api/itemApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import your context

export const useDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext); // Get Auth state
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // GUARD 1: If Auth is still loading, do nothing yet
    if (authLoading) return;

    // GUARD 2: If Auth finished and there is no user, don't fetch data
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchItems = async () => {
      console.log("FETCHING DATA - User is authenticated:", user.uid);
      try {
        setLoading(true);
        setError(null);

        const res = await itemApi.list();
        const normalized = Array.isArray(res) ? res : res.items || [];
        setItems(normalized);
      } catch (err) {
        console.error("Failed to load items:", err);
        setError("Could not sync with the database.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    
    // dependency array now includes user and authLoading
  }, [user, authLoading]); 

  const handleCreate = () => navigate("/create-item");
  const handleItemDetails = (id) => navigate(`/item-details/${id}`);
  const handleReportsList = (id) => navigate(`/item/${id}/reports`);

  return {
    items,
    loading: loading || authLoading, // Combine loading states for UI
    error,
    handleCreate,    
     handleItemDetails,
    handleReportsList,
    // handleGoToReports,
    itemsWithReports: items.map((item) => ({
      ...item,
      hasReports: true//item.reportsCount > 0 || (item.reports && item.reports.length > 0),
    }))  
    
  };
};