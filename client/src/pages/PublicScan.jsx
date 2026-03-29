import { useEffect, useState } from "react";
import { publicApi } from "../api/publicApi";
import { useParams, useNavigate } from "react-router-dom";
import Founder from "../layouts/Founder/Founder"; 
import CustomButton from "../components/CustomButton/CustomButton";
export default function PublicScan() {
  const { token } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    publicApi.getItem(token).then((res) => setItem(res.data));
  }, [token]);

  if (!item) return <p>Loading…</p>;

  return (
     <Founder
      title="Lost Item Report"
      subtitle="Be someone's hero!!"
    >
    <div className="p-6">
      <h1 className="text-xl font-bold"> {item.nickname}</h1>

      {item.verificationQuestion && (
        <p className="mt-2 text-gray-700">
          Verification Question: <strong>{item.verificationQuestion}</strong>
        </p>
      )}

      <CustomButton     
        onClick={() => navigate(`/found/${token}`)}
      >
        I Found This Item
      </CustomButton>
    </div>
    </Founder>
  );
}