// Public routes: no auth required.

const express = require("express");
const router = express.Router();

const { validateBody } = require("../middleware/validate");
const { foundReportSchema } = require("../utils/validators");
const { getPublicItem, submitFoundReport } = require("../controllers/publicController");

// Public scan page data
router.get("/items/:token", getPublicItem);

// Public found report submission
router.post("/items/:token/found", validateBody(foundReportSchema), submitFoundReport);

module.exports = router;