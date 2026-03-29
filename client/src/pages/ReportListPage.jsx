import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useItemReports } from "../hooks/useItemReports";
import ReportList from "../components/reportList/ReportList";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

export default function ReportListPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { reports, loading, updateStatus } = useItemReports(itemId);

  // if there are reports we take the nickname of the first one
  const itemNickname = reports.length > 0 ? reports[0].item_nickname : "item";

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="w-100">
        <div className="mb-4 px-2">
          <h2 className="text-white fw-bold mb-1">
            Found Reports: {itemNickname}
          </h2>

          <button
            className="btn btn-link text-white p-0 text-decoration-none d-flex align-items-center"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-chevron-left me-2"></i>
            Back
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner message="Fetching reports..." />
      ) : (
        <ReportList reports={reports} onUpdateStatus={updateStatus} />
      )}
    </MainLayout>
  );
}
