import React from "react";
import ReportDetail from "../reportDetail/ReportDetail";

export default function ReportsList({ reports, onUpdateStatus }) {
  return (
    <div className="d-flex flex-colimn gap-3">
      {reports.map((report) => (
        <ReportDetail
          key={report.id}
          report={report}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}
