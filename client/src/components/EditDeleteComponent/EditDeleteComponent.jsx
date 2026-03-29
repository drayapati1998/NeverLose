import React from "react";
import "./EditDeleteComponent.css";

const EditDeleteComponet = ({ onEdit, onDelete }) => {
  return (
    <div className="EditDelete-container">
      {/* Edit icon */}
      <button className="btn btn-edit btn-link p-0 border-0" onClick={onEdit}>
        <i className="bi bi-pencil-fill"></i>
      </button>

      {/* Bin icon */}
      <button
        className="btn btn-delete btn-link p-0 border-0"
        onClick={onDelete}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
    </div>
  );
};

export default EditDeleteComponet;
