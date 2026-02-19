// Routes for user authentication and profile management.

const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getCurrentUser,
  updateUser
} = require("../controllers/usersController");

const { requireFirebaseAuth } = require("../middleware/firebaseAuth");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/me", requireFirebaseAuth, getCurrentUser);
router.put("/me", requireFirebaseAuth, updateUser);

module.exports = router;