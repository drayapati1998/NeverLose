import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { labelApi } from "../../api/labelApi";
import itemApi from "../../api/itemApi";
import qrIcon from "../../assets/QR-Icon.svg";
import tagIcon from "../../assets/tag-icon.svg";
import printIcon from "../../assets/print-icon.svg";
import walletQR from "../../assets/WalletQR.svg";
import circleQR from "../../assets/CircleQR.svg";
import squareQR from "../../assets/SquareQR.svg";
import customQR from "../../assets/CustomQR.svg";
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import "./LabelScreen.css";

export default function LabelScreen() {
  const { itemId } = useParams();
  const location = useLocation();

  // Item data passed from ItemCard via navigate()
  const initialItem = location.state;

  const [item, setItem] = useState(initialItem);
  const [error, setError] = useState("");

  // Custom size inputs
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  //confirmation States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  // If user refreshes the page, state is lost → fetch minimal item info
  useEffect(() => {
    const loadItem = async () => {
      try {
        const res = await itemApi.getItemById(itemId);
        const data = res;

        // Default presets
        const labelPresets = [
          {
            id: "wallet",
            name: "Wallet",
            description: "Standard ID size (8.5 x 5.4 cm)",
            shape: "rect",
            widthMm: 85.6,
            heightMm: 54.0,
          },
          {
            id: "airtag",
            name: "AirTag",
            description: "Circular sticker (3.2 cm diameter)",
            shape: "circle",
            diameterMm: 32.0,
          },
          {
            id: "small-tag",
            name: "Small Tag",
            description: "Ideal for keychains (3 x 2 cm)",
            shape: "rect",
            widthMm: 30.0,
            heightMm: 20.0,
          },
          {
            id: "custom",
            name: "Custom",
            description: "Set your own dimensions",
          },
        ];

        setItem({
          ...data,
          labelPresets: data.labelPresets || labelPresets,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load item details.");
      }
    };

    loadItem();
  }, [initialItem, itemId]);

  const downloadPreset = async (preset) => {
    try {
      let payload = { preset }; // DO NOT CHANGE API CALL STRUCTURE

      // Custom requires width + height
      if (preset === "custom") {
        if (!customWidth || !customHeight) {
          alert("Please enter both width and height.");
          return;
        }

        const w = Number(customWidth);
        const h = Number(customHeight);

        if (w <= 0 || w > 100 || h <= 0 || h > 100) {
          alert("Width and height must be between 1 and 100 mm.");
          return;
        }

        payload.widthMm = w;
        payload.heightMm = h;
      }

      const res = await labelApi.downloadPdf(itemId, payload);

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

  const handlePrepareDownload = (presetId) => {
    setSelectedPresetId(presetId);

    if (presetId === "custom") {
      if (!customWidth || !customHeight) {
        alert("Please enter dimensions for your custom label.");
        return;
      }
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmAction = () => {
    downloadPreset(selectedPresetId);
    setIsConfirmOpen(false);
    setSelectedPresetId(null);
  };

  if (error) return <div className="alert alert-danger m-5">{error}</div>;
  if (!item) {
    return <p className="p-6">Loading…</p>;
  }

  return (
    <div className="container py-5">
      <div
        className="rounded-5 p-4 p-md-5 shadow-lg border-0"
        style={{ backgroundColor: "var(--nl-deep-blue)", color: "white" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="display-5 fw-extrabold mb-0">
              Download your QR Code
            </h1>
            <p className="fs-4" style={{ color: "white" }}>
              {item.nickname}
            </p>

            <p className="font-semibold">
              Public Scan URL:
              <code className="block bg-gray-100 p-2 rounded text-sm mt-1">
                {item.publicUrl}
              </code>
            </p>
          </div>
          <div className="d-none d-md-flex align-items-center gap-3 p-3 rounded-4">
            <img alt="" src={qrIcon} width="50" className="me-2" />
            <i className="bi bi-arrow-right"></i>
            <img alt="" src={printIcon} width="50" className="me-2" />
            <i className="bi bi-arrow-right"></i>
            <img alt="" src={tagIcon} width="60" className="me-2" />
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {item.labelPresets?.map((preset) => (
            <div key={preset.id} className="col">
              {/* Card */}
              <div
                onClick={() => {
                  if (preset.id !== "custom") handlePrepareDownload(preset.id);
                }}
                role="button"
                className="h-100 nl-preset-card shadow-sm p-4 d-flex flex-column align-items-center justify-content-center"
              >
                {/* Icons */}
                <div
                  className="mb-3 d-flex align-items-center justify-content-center"
                  style={{ height: "60px" }}
                >
                  <img
                    src={
                      preset.id === "wallet"
                        ? walletQR
                        : preset.id === "airtag"
                          ? squareQR
                          : preset.id === "small-tag"
                            ? circleQR
                            : customQR
                    }
                    alt={preset.name}
                    className="img-fluid"
                    style={{ maxHeight: "100%", width: "auto" }}
                  />
                </div>

                {/* Info Tag */}
                <div className="mb-3">
                  <h5
                    className="preset-name"
                    style={{ fontFamily: "var(--font-titles)" }}
                  >
                    {preset.name} Size
                  </h5>
                  <p className="preset-desc mb-0">
                    {preset.description || "Click to download"}
                  </p>
                </div>

                {/* Download Buttons */}
                {preset.id === "custom" && (
                  <div
                    className="w-100 mt-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="d-flex gap-2 mb-3">
                      <input
                        type="number"
                        placeholder="Width"
                        className="form-control form-control-sm border-0 text-center bg-white shadow-sm py-2"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Height"
                        className="form-control form-control-sm border-0 text-center bg-white shadow-sm py-2"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-light btn-sm w-100 rounded-pill fw-bold py-2 text-primary"
                      onClick={() => handlePrepareDownload("custom")}
                    >
                      Generate PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        title="Ready to Print?"
        message={`You are about to download the ${selectedPresetId} label for "${item.nickname}". This will generate a printable PDF file.`}
        onConfirm={handleConfirmAction}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}
