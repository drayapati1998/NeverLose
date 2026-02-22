// routes/publicRoutes.js
// Public routes (no auth required).

const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController");

// GET /public/scan/:token
router.get("/scan/:token", publicController.getItemByToken);

module.exports = router;