const express = require("express");
const router = express.Router();
const {
  createCulture,
  getAllCultures,
  updateCulture,
  deleteCulture,
  getCulture,
} = require("../controllers/cultureController");
const authMiddleware = require("../middleware/authMiddleware"); // Use the authentication middleware

// Create a new culture
router.post("/", authMiddleware, createCulture);

// Get all cultures
router.get("/", authMiddleware, getAllCultures);

// Get a single culture for editing
router.get("/:userId", authMiddleware, getCulture);

// Update a culture (partial update for individual columns)
router.patch("/:id", authMiddleware, updateCulture);

// Delete a culture
router.delete("/:id", authMiddleware, deleteCulture);

module.exports = router;
