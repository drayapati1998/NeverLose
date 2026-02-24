import React, { useState } from "react";
import itemApi from "../../api/itemApi";

function ItemForm({ form, setForm, next }) {
   return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Item Details</h2>

      <label className="block mb-3">
        <span className="font-medium">Nickname *</span>
        <input
          className="w-full border p-2 rounded mt-1"
          value={form.nickname}
          onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          placeholder="e.g., Black Backpack"
        />
      </label>

      <label className="block mb-3">
        <span className="font-medium">Description</span>
        <textarea
          className="w-full border p-2 rounded mt-1"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Optional description"
        />
      </label>

      <label className="block mb-3">
        <span className="font-medium">Photo URL</span>
        <input
          className="w-full border p-2 rounded mt-1"
          value={form.photoUrl}
          onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
          placeholder="Optional photo URL"
        />
      </label>

      <button
        onClick={next}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Next: Verification Setup
      </button>
    </div>
  );
}


export default ItemForm;