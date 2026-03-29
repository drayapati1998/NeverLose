import { useState, useEffect } from "react";
import { reportsApi } from "../api/reportsApi";
import { auth } from "../config/firebaseConfig";

export const useItemReports = (itemId) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // UI indicator for asynchronous operations
  const [authReady, setAuthReady] = useState(false); // Gatekeeper: ensures Firebase is initialized before API calls

  // --- AUTHENTICATION LISTENER ---
  useEffect(() => {
    // Listens to Firebase auth state changes to avoid anonymous API requests
    const unsub = auth.onAuthStateChanged(() => {
      setAuthReady(true);
    });
    // Cleanup function to prevent memory leaks when the component unmounts
    return unsub;
  }, []);

  // ---DATA FETCHING LOGIC---
  useEffect(() => {
    // Only fetch data if we have an Item ID and the User session is ready
    if (!authReady || !itemId) return;

    const fetchReports = async () => {
      try {
        setLoading(true); // Start loading state before the request
        const res = await reportsApi.list(itemId); // Call the API service
        setReports(res.data || []); // Update state with fetched data or an empty array as fallback
      } catch (err) {
        console.error("Fail to load reports:", err);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };
    fetchReports();
  }, [itemId, authReady]); // Re-run if the Item changes or Auth becomes ready

  // --- UPDATE STATUS ---
  //Updates a report status in the database and performs an "Optimistic Update" on the local state for a seamless user experience.
  const updateStatus = async (reportId, newStatus) => {
    try {
      // Inform the backend about the status change
      await reportsApi.updateStatus(reportId, newStatus);
      //Optimistically update the UI by mapping through the list and replacing only the modified report's status.
      // create a new list based on previous one, if the user change the status it find the item, create a new report for it and replace the newStatus.
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId ? { ...report, status: newStatus } : report,
        ),
      );
    } catch (err) {
      alert("Error updating status");
    }
  };
  return { reports, loading: !authReady || loading, updateStatus };
};
