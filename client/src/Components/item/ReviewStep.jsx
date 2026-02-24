import React from "react";

export default function ReviewStep({ form, back, create }) {
  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Review Item</h2>

      <div className="mb-4">
        <p><strong>Nickname:</strong> {form.nickname}</p>
        <p><strong>Description:</strong> {form.description || "—"}</p>
        <p><strong>Photo URL:</strong> {form.photoUrl || "—"}</p>

        <p className="mt-3">
          <strong>Verification Enabled:</strong>{" "}
          {form.verification.enabled ? "Yes" : "No"}
        </p>

        {form.verification.enabled && (
          <p>
            <strong>Question:</strong> {form.verification.question}
          </p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={back}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Back
        </button>

        <button
          onClick={create}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Create Item
        </button>
      </div>
    </div>
  );
}