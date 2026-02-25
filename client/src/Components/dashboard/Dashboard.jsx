import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ItemList from "../itemlist/ItemList";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import itemApi from "../../api/itemApi";
import { Row, Col, Container } from "react-bootstrap";

function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
  const fetchItems = async () => {
    try {
      const res = await itemApi.list();
      setItems(res);
    } catch (err) {
      console.error("Failed to load items:", err);
    }
  };

  fetchItems();
}, []);


  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Container fluid className="px-0">
      {/* header pn dashboard */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Your Items</h2>
          <p className="text-white-50 small">
            Manage and protect your valuables
          </p>
        </div>

        <CustomButton
          onClick={() => navigate("/create")}
          variant="primary"
          className="btn-red"
        >
          + Create New Item
        </CustomButton>
      </div>

      {/* Grid de Items */}
      {!items || items.length === 0 ? (
        <div className="text-center py-5 bg-white bg-opacity-10 rounded-4 border border-white border-opacity-25">
          <p className="mb-0 text-white">You haven't created any items yet.</p>
          <small className="text-white-50">
            Click the button above to start protecting your things.
          </small>
        </div>
      ) : (
        <Row className="g-4">
          {items.map((item) => (
            <Col key={item.id} xs={12} md={6} lg={4}>
              <ItemList item={item} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Dashboard;
