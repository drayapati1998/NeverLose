import { useState, useEffect } from "react";
import itemApi from "../api/itemApi";

export function useItemDetails(id) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await itemApi.getItemById(id)
        setItem(res);
      } catch (err) {
        setError("Item not found.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return {
    item,
    loading,
    error
  };
}