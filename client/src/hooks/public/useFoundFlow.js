import { useState, useEffect } from "react";
import { publicApi } from "../../api/publicApi"

export function useFoundFlow(token) {
  const [step, setStep] = useState(1);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [photoUrl, seturl] = useState("");

  const [verificationAnswer, setVerificationAnswer] = useState("");
  const [reportData, setReportData] = useState({
    finder: { name: "", email: "", phone: "" },
    message: "",
    foundLocationText: "",
    photoUrl: "",
  });

  useEffect(() => {

    //todo: token naver change
    async function load() {
      try {
        const res = await publicApi.getItem(token);
        setItem(res.data);
      } catch (err) {
        setError("Invalid or expired tag.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return {
    step,
    next,
    back,
    item,
    loading,
    error,
    verificationAnswer,
    setVerificationAnswer,
    photoUrl,
    seturl,
    reportData,
    setReportData,
  };
}