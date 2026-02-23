import React, { useState } from "react";
import itemApi from "../../api/itemApi";

function ItemForm({ onCreated }) {
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await itemApi.create({ nickname, description });
      setNickname("");
      setDescription("");
      setStatus("Item created");
      onCreated && onCreated();
    } catch (err) {
      setStatus(err.response?.data?.error || "Failed to create item");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required /><br/>
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br/>
      <button type="submit">Create Item</button>
      {status && <p>{status}</p>}
    </form>
  );
}

export default ItemForm;