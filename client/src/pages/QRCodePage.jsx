import { useLocation, useParams } from "react-router-dom";
import { labelApi } from "../api/labelApi";

export default function QRCodePage() {
  const { state } = useLocation();
  const { itemId } = useParams();

  const item = state; // contains token, presets, etc.

  function downloadPreset(preset) {
    labelApi
      .downloadPdf(itemId, { preset })
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `label-${preset}.pdf`;
        a.click();
      });
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Label for {item.nickname}</h1>

      <p className="mt-2">Public Scan URL:</p>
      <code className="block bg-gray-100 p-2 rounded">{item.publicScanUrl}</code>

      <h2 className="mt-4 font-semibold">Download Label</h2>
      <div className="flex gap-3 mt-2">
        {item.labelPresets.map((preset) => (
          <button
            key={preset.id}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => downloadPreset(preset.id)}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
}