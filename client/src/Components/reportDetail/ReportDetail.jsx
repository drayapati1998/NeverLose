import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reportsApi } from "../../api/reportsApi";

export default function ReportDetail() {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    reportsApi.detail(reportId).then((res) => setReport(res.data));
  }, [reportId]);

  if (!report) return <p className="p-6">Loading…</p>;

  const updateStatus = async (status) => {
    await reportsApi.updateStatus(reportId, status);
    setReport({ ...report, status });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Report Details</h1>

      <p><strong>Email:</strong> {report.finder_email}</p>
      <p><strong>Phone:</strong> {report.finder_phone || "N/A"}</p>
      <p><strong>Message:</strong> {report.message}</p>
      <p><strong>Location:</strong> {report.found_location_text || "N/A"}</p>
      <p><strong>Verification:</strong> {report.verification_answer || "N/A"}</p>
      <p><strong>Status:</strong> {report.status}</p>

      <div className="mt-4 flex gap-2">
        <button onClick={() => updateStatus("OWNER_CONTACTED")} className="btn">
          Owner Contacted
        </button>
        <button onClick={() => updateStatus("RESOLVED")} className="btn">
          Resolved
        </button>
        <button onClick={() => updateStatus("SPAM")} className="btn">
          Mark Spam
        </button>
      </div>
    </div>
  );
}