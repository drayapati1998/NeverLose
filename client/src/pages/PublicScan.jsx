import { useEffect, useState } from "react";
import { publicApi } from "../api/publicApi";
import { useParams, useNavigate } from "react-router-dom";

export default function PublicScan() {
  const { token } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    publicApi.getItem(token).then((res) => setItem(res.data));
  }, [token]);

  if (!item) return <p>Loading…</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Found: {item.nickname}</h1>

      {item.verificationQuestion && (
        <p className="mt-2 text-gray-700">
          Verification Question: <strong>{item.verificationQuestion}</strong>
        </p>
      )}

      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={() => navigate(`/found/${token}`)}
      >
        I Found This Item
      </button>
    </div>
  );
}