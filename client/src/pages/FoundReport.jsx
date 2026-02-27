import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { publicApi } from "../api/publicApi";

export default function FoundReport() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    finder: { name: "", email: "", phone: "" },
    message: "",
    foundLocationText: "",
    photoUrl: "",
    verificationAnswer: ""
  });

  useEffect(() => {
    publicApi
      .getItem(token)
      .then((res) => setItem(res.data))
      .catch(() => setError("This tag could not be found."));
  }, [token]);

  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-bold mb-2">Tag not found</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  if (!item) return <p className="p-6">Loading…</p>;

  if (item.status === "CLOSED") {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-bold mb-2">This tag is inactive</h1>
        <p className="text-gray-700">
          The owner is no longer accepting reports for this item.
        </p>
      </div>
    );
  }

  const updateFinder = (field, value) =>
    setForm((prev) => ({
      ...prev,
      finder: { ...prev.finder, [field]: value }
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!form.finder.email.trim()) {
      setStatus("Email is required.");
      return;
    }
    if (!form.message.trim()) {
      setStatus("Message is required.");
      return;
    }
    if (item.verificationQuestion && !form.verificationAnswer.trim()) {
      setStatus("Please answer the verification question.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await publicApi.submitFoundReport(token, form);
      if (res.data.ok) {
        setStatus("Thank you! Your report has been sent to the owner.");
        setTimeout(() => navigate(`/f/${token}`), 2000);
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("Failed to submit report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Report this found item</h1>
      <p className="text-gray-700 mb-4">
        Your contact details will be shared with the owner so they can follow up.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Your Email *</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={form.finder.email}
            onChange={(e) => updateFinder("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.finder.name}
            onChange={(e) => updateFinder("name", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.finder.phone}
            onChange={(e) => updateFinder("phone", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message *</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={3}
            value={form.message}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, message: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Where did you find it?</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.foundLocationText}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                foundLocationText: e.target.value
              }))
            }
          />
        </div>

        {/* Photo upload placeholder – wire to Storage if needed */}
        <div>
          <label className="block text-sm font-medium">
            Photo URL (optional)
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.photoUrl}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, photoUrl: e.target.value }))
            }
          />
        </div>

        {item.verificationQuestion && (
          <div>
            <label className="block text-sm font-medium">
              Verification question
            </label>
            <p className="text-sm text-gray-700 mb-1">
              {item.verificationQuestion}
            </p>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={form.verificationAnswer}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  verificationAnswer: e.target.value
                }))
              }
            />
          </div>
        )}

        {status && <p className="text-sm text-red-600">{status}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit report"}
        </button>
      </form>
    </div>
  );
}