import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { labelApi } from "../../api/labelApi";


export default function LabelScreen() {
  const { itemId } = useParams();
  const location = useLocation();

  // Item data passed from ItemCard via navigate()
  const initialItem = location.state;

  const [item, setItem] = useState(initialItem);
  const [error, setError] = useState("");

  // If user refreshes the page, state is lost → fetch minimal item info
  useEffect(() => {
  const loadItem = async () => {
    if (!item) {
      try {
        const res = await fetch(`/api/items/${itemId}`);
        const data = await res.json();

        // Inject default presets
        const presets = [
          { id: "wallet", name: "Wallet Label" },
          { id: "airtag", name: "Airtag Label" },
          { id: "small-tag", name: "Small Tag" }
        ];

        setItem({
          ...data,
          labelPresets: data.labelPresets || presets
        });

      } catch (err) {
        console.error(err);
        setError("Unable to load item details.");
      }
    }
  };

  loadItem();
}, [item, itemId]);


  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  if (!item) {
    return <p className="p-6">Loading…</p>;
  }

  const downloadPreset = async (preset) => {
    try {
      const res = await labelApi.downloadPdf(itemId, { preset });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `label-${preset}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed:", err);
      alert("Failed to download label.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Label for {item.nickname}</h1>

      <p className="text-gray-700 mb-4">
        Use these printable labels to attach to your item. Scanning the QR code
        will take finders to your public page.
      </p>

      <div className="mb-4">
        <p className="font-semibold">Public Scan URL:</p>
        <code className="block bg-gray-100 p-2 rounded text-sm mt-1">
          {item.publicScanUrl}
        </code>
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-2">Download Label</h2>

      <div className="flex flex-col gap-3">
        {item.labelPresets?.map((preset) => (
          <button
            key={preset.id}
            onClick={() => downloadPreset(preset.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
}