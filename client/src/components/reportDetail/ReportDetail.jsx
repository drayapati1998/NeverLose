import React from "react";
import { Row, Col, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useItemReports } from "../../hooks/useItemReports";

const ReportDetail = ({ report, onUpdateStatus }) => {
  const {} = useItemReports();
  const statusConfig = {
    NEW: { color: "var(--nl-success)", label: "New" },
    OWNER_CONTACTED: { color: "var(--nl-warning)", label: "Contacted" },
    RESOLVED: { color: "var(--nl-info)", label: "Recovered" },
    SPAM: { color: "var(--nl-danger)", label: "Spam" },
  };
  const currentStatus = statusConfig[report.status] || statusConfig.NEW;
  const renderTooltip = (text) => <Tooltip id="button-tooltip">{text}</Tooltip>;

  return (
    <div className="bg-white rounded-4 overflow-hidden shadow p-a mt-3">
      {/* Header: Status and date */}
      <div className="d-flex align-items-center gap-3 mb-2">
        <Badge
          style={{ backgroundColor: currentStatus.color, color: "#000" }}
          className="px-3 text-uppercase"
        >
          {currentStatus.label}
        </Badge>
        <span className="text-muted small italic">
          Reported on: {new Date(report.created_at).toLocaleDateString()}
        </span>
      </div>
      <div
        style={{
          height: "2px",
          backgroundColor: currentStatus.color,
          width: "100%",
          marginBottom: "20px",
          transition: "Background-color 0.3s ease",
        }}
      />

      <Row>
        {/* card left side */}
        <Col md={7} className="border-end">
          {/* Found context section */}
          <section className="mb-4 pb-3 border-bottom">
            <h6 className="text-uppercase text-muted fw-bold small mb-3">
              Found Context
            </h6>
            <div className="mb-2">
              <span className="fw-bold me-2">Found Location:</span>
              <span className="">{report.found_location_text || "N/A"}</span>
            </div>
            <div className="mb-2">
              <span className="fw-bold me-2">Verification Answer:</span>
              <span className="text-primary fw-medium">
                {report.verification_answer || "N/A"}
              </span>
            </div>
            <div className="mb-2">
              <span className="fw-bold d-block">Message from finder:</span>
              <p className="mb-0 text-secondary">"{report.message || "N/A"}"</p>
            </div>
          </section>

          {/* finder contact section */}
          <section>
            <h6 className="text-uppercase text-muted fw-bold small mb-3">
              Finder Contact
            </h6>
            <div className="mb-1">
              <span className="fw-bold">Email address:</span>
              {report.finder_email}
            </div>
            <div className="mb-1">
              <span className="fw-bold">Finder Name:</span>
              {report.finder_name}
            </div>
            <div className="mb-1">
              <span className="fw-bold">Phone Number:</span>
              {report.finder_phone}
            </div>
          </section>
        </Col>
        {/* card rigt side */}
        {/* manage report */}
        <Col md={5} className="ps-md-4">
          <div className="manage-section">
            <h6 className="text-uppercase text-muted fw-bold small mb-2">
              Manage Report
            </h6>
            <p className="extra-small text-muted mb-4">
              Update the status of this report to keep your dashboard organized.
            </p>
            {/* Buttons list */}
            <div className="d-flex flex-column gap-3 mt-4">
              {/* Contacted Button */}
              <OverlayTrigger
                placement="bottom"
                overlay={renderTooltip(
                  "You have reached out to the finder to coordinate the recovery.",
                )}
              >
                <button
                  className={`btn w-100 fw-bold ${report.status === "OWNER-CONTACTED" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => onUpdateStatus(report.id, "OWNER-CONTACTED")}
                >
                  Contacted
                </button>
              </OverlayTrigger>

              {/* Item Recovered Button */}
              <OverlayTrigger
                placement="bottom"
                overlay={renderTooltip(
                  "Case closed! The item is back in your hands. This will resolve the report.",
                )}
              >
                <button
                  className={`btn w-100 fw-bold ${report.status === "RESOLVED" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => onUpdateStatus(report.id, "RESOLVED")}
                >
                  Item Recovered
                </button>
              </OverlayTrigger>

              {/* Spam Button */}
              <OverlayTrigger
                placement="bottom"
                overlay={renderTooltip(
                  "Mark this as fake or irrelevant. It will be moved out of your active reports.",
                )}
              >
                <button
                  className={`btn btn-outline-danger w-100 fw-bold ${report.status === "SPAM" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => onUpdateStatus(report.id, "SPAM")}
                >
                  Spam
                </button>
              </OverlayTrigger>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReportDetail;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { reportsApi } from "../../api/reportsApi";

// export default function ReportDetail() {
//   const { reportId } = useParams();
//   const [report, setReport] = useState(null);

//   useEffect(() => {
//     reportsApi.detail(reportId).then((res) => setReport(res.data));
//   }, [reportId]);

//   if (!report) return <p className="p-6">Loading…</p>;

//   const updateStatus = async (status) => {
//     await reportsApi.updateStatus(reportId, status);
//     setReport({ ...report, status });
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">Report Details</h1>

//       <p><strong>Email:</strong> {report.finder_email}</p>

//       <p><strong>Phone:</strong> {report.finder_phone || "N/A"}</p>

//       <p><strong>Message:</strong> {report.message}</p>

//       <p><strong>Location:</strong> {report.found_location_text || "N/A"}</p>

//       <p><strong>Verification:</strong> {report.verification_answer || "N/A"}</p>

//       <p><strong>Status:</strong> {report.status}</p>

//       <div className="mt-4 flex gap-2">

//         <button onClick={() => updateStatus("OWNER_CONTACTED")} className="btn">

//           Owner Contacted

//         </button>

//         <button onClick={() => updateStatus("RESOLVED")} className="btn">

//           Resolved

//         </button>

//         <button onClick={() => updateStatus("SPAM")} className="btn">

//           Mark Spam

//         </button>

//       </div>

//     </div>

//   );

// }
