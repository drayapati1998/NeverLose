import { useState } from "react";
import ItemForm from "../components/item/ItemForm";
import VerificationStep from "../components/item/VerificationStep";
import ReviewStep from "../components/item/ReviewStep";
import itemApi from "../api/itemApi";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";

export default function CreateItemPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nickname: "",
    description: "",
    photoUrl: "",
    verification: { enabled: false, question: "" },
  });

  const navigate = useNavigate();

  async function handleCreate() {
    const res = await itemApi.create(form);
    navigate(`/label/${res.data.id}`, { state: res.data });
  }

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        {step === 1 && (
          <ItemForm form={form} setForm={setForm} next={() => setStep(2)} />
        )}

        {step === 2 && (
          <VerificationStep
            form={form}
            setForm={setForm}
            next={() => setStep(3)}
            back={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <ReviewStep
            form={form}
            back={() => setStep(2)}
            create={handleCreate}
          />
        )}
      </div>
    </MainLayout>
  );
}
