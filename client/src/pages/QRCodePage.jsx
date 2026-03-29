import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LabelScreen from "../components/LabelScreen/LabelScreen";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
function QRCodePage() {
  const { loading: authLoading } = useContext(AuthContext);

  if (authLoading) return <LoadingSpinner message="Authenticating..." />;
  return (
    <div>
      <LabelScreen />
    </div>
  );
}

export default QRCodePage;
