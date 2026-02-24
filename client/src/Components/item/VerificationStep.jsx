import React from "react";

export default function VerificationStep({ form, setForm, next, back }) {
  const toggle = () =>
    setForm({
      ...form,
      verification: {
        ...form.verification,
        enabled: !form.verification.enabled
      }
    });

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Verification Setup</h2>

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={form.verification.enabled}
          onChange={toggle}
        />
        <span className="font-medium">Enable Verification Question</span>
      </label>

      {form.verification.enabled && (
        <label className="block mb-3">
          <span className="font-medium">Verification Question *</span>
          <input
            className="w-full border p-2 rounded mt-1"
            value={form.verification.question}
            onChange={(e) =>
              setForm({
                ...form,
                verification: {
                  ...form.verification,
                  question: e.target.value
                }
              })
            }
            placeholder="e.g., What color is the inside pocket?"
          />
        </label>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={back}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Back
        </button>

        <button
          onClick={next}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Review & Create
        </button>
      </div>
    </div>
  );
}