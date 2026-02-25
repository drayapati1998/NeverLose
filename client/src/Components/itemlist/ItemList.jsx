import React from "react";
import { useNavigate } from "react-router-dom";

export default function ItemList({ item }) {
  const navigate = useNavigate();
const defaultPresets = [
  { id: "wallet", name: "Wallet Label" },
  { id: "airtag", name: "Airtag Label" },
  { id: "small-tag", name: "Small Tag" }
];

item.labelPresets = defaultPresets;

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{item.nickname}</h3>

        <span
          className={`px-2 py-1 text-xs rounded ${
            item.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {item.status}
        </span>
      </div>

      {item.description && (
        <p className="text-gray-600 mt-1">{item.description}</p>
      )}

      <div className="mt-3 text-sm">
        <p>
          <strong>Last Activity:</strong>{" "}
          {item.lastActivityAt ? item.lastActivityAt : "No activity yet"}
        </p>

        <p className="mt-1">
          <strong>Scan URL:</strong>{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
            {item.publicScanUrl}
          </code>
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={() => navigate(`/label/${item.id}`, { state: item })}
          className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
        >
          View Label
        </button>

        {/* Public Scan Page */}
        <button
          onClick={() => navigate(`${item.publicScanUrl}`)}
          className="px-3 py-2 bg-gray-200 rounded text-sm"
        >
          Open Public Scan Page
        </button>

        {/* Found Report Page */}
        <button
          onClick={() => navigate(`/found/${item.token}`)}
          className="px-3 py-2 bg-gray-200 rounded text-sm"
        >
          Submit Found Report (Test)
        </button>
        {/* Owner Reports */}
        <button
          onClick={() => navigate(`/reports/${item.id}`)}
          className="px-3 py-2 bg-purple-600 text-white rounded text-sm"
        >
          View Reports
        </button>

      </div>
    </div>
  );
}