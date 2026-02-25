const express = require("express");
const router = express.Router();

const {
  getPublicItem,
  submitFoundReport
} = require("../controllers/publicController");

// No auth: public endpoints
router.get("/items/:token", getPublicItem);
router.post("/items/:token/found", submitFoundReport);

module.exports = router;
