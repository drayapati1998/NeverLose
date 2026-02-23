// Main Express entrypoint.
// Wires security middleware and routes.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const itemsRouter = require("./routes/items");
const publicRouter = require("./routes/public");
const usersRouter = require("./routes/users");
const reportRouter = require("./routes/reports");


const app = express();

// Basic security headers
app.use(helmet());

// Allow frontend (React) to call this API
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// User authentication routes
app.use("/api/users", usersRouter);

// Owner (authenticated) APIs
app.use("/api/items", itemsRouter);

// Public (no auth) APIs
app.use("/api/public", publicRouter);

// Report APIs
app.use("/api/reports", reportRouter);

// Simple health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});