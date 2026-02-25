import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reportsApi } from "../../api/reportsApi";
import { auth } from "../../config/firebaseConfig";

export default function ReportsList() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [authReady, setAuthReady] = useState(false);

  // 1️⃣ Hook #1 — Wait for Firebase auth to initialize
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(() => {
      setAuthReady(true);
    });
    return unsub;
  }, []);

  // 2️⃣ Hook #2 — Fetch reports (only after auth is ready)
  useEffect(() => {
    if (!authReady) return; // safe: logic INSIDE hook, not around it

    const fetchReports = async () => {
      try {
        const res = await reportsApi.list(itemId);
        setReports(res.data);
      } catch (err) {
        console.error("Failed to load reports:", err);
      }
    };

    fetchReports();
  }, [itemId, authReady]);

  // 3️⃣ Now it's safe to conditionally return
  if (!authReady) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Found Reports</h1>

      {reports.map((r) => (
        <div
          key={r.id}
          className="border p-4 rounded mb-3 cursor-pointer"
          onClick={() => navigate(`/reports/detail/${r.id}`)}
        >
          <div className="flex justify-between">
            <strong>{r.finder_email}</strong>
            <span className="text-sm">{r.status}</span>
          </div>
          <p className="text-gray-600">{r.message}</p>
        </div>
      ))}
    </div>
  );
}