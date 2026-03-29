import React from "react";
import ItemCard from "../itemCard/ItemCard";
import LabelScreen from "../LabelScreen/LabelScreen";
import EditDeleteComponet from "../EditDeleteComponent/EditDeleteComponent";

function ItemDetailPage() {
  return (
    <div className="bg-white rounded-4 overflow-hidden shadow p-a mt-3">
      <EditDeleteComponet />
      <ItemCard />
      <LabelScreen />
    </div>
  );
}

export default ItemDetailPage;
