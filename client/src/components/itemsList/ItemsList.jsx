import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";
import "./itemsList.css";

const ItemList = ({ items, onCreateClick, onDetailClick }) => {
  return (
    <div className="w-100">
      <div className="d-flex justify-content-between align-items-center mb-4 px-2">
        <h2 className="text-white fw-bold mb-0">My Secure Tags</h2>
        <CustomButton onClick={onCreateClick} className="btn-red btn-sm px-4">
          Add New Item
        </CustomButton>
      </div>

      <div className="bg-white rounded-4 overflow-hidden shadow">
        <Table hover responsive className="mb-0 custom-table">
          <thead>
            <tr>
              <th className="p-3 border-0 w-50">Item Nickname</th>
              <th className="p-3 border-0">Status</th>
              <th className="p-3 border-0">Last Activity</th>
              <th className="p-3 border-0 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="align-middle border-bottom">
                <td className="p-3 fw-bold item-nickname">{item.nickname}</td>
                <td className="p-3">
                  <span
                    className={`status-dot me-2 ${item.status.toLowerCase()}`}
                  ></span>
                  {item.status}
                </td>
                <td className="p-3 text-muted small">
                  {item.lastActivity || "No activity yet"}
                </td>

                <td className="p-3 text-center">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => onDetailClick(item.id)}
                  >
                    <i className="bi bi-arrow-right text-primary fs-4"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ItemList;
