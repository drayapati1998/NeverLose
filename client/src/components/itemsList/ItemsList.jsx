import React from "react";
import { Table } from "react-bootstrap";
import "./itemsList.css";

const ItemList = ({ items, onItemDetails, onReportsList }) => {
  return (
    <div className="bg-white rounded-4 overflow-hidden shadow">
      <Table responsive className="mb-0 custom-table">
        <thead>
          <tr>
            <th className="p-3 border-0 w-50">Item Nickname</th>
            <th className="p-3 border-0">Item Status</th>
            <th className="p-3 border-0 text-center">View Report</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            // reports Count for defining View report enable or disable..
            const hasReports =
              item.reportsCount > 0 ||
              (item.reports && item.reports.length > 0);

            return (
              <tr key={item.id} className="align-middle border-bottom">
                <td
                  className="p-3 fw-bold item-nickname"
                  onClick={() => onItemDetails(item.id)}
                >
                  {item.nickname}
                </td>

                <td className="p-3">
                  <span
                    className={`status-dot me-2 ${item.status.toLowerCase()}`}
                  ></span>
                  {item.status}
                </td>

                <td className="p-3 text-center">
                  <button
                    className="btn btn-link p-0 border-0"
                    onClick={() => onReportsList(item.id)}
                    disabled={!hasReports}
                    title={hasReports ? "View reports" : "No scans yet"}
                  >
                    <i
                      className={`bi bi-arrow-right fs-4 ${
                        hasReports ? "text-primary" : "text-muted"
                      }`}
                    ></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemList;
