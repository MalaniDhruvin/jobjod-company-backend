const express = require("express");
const router = express.Router();
const {
  createAbout,
  getAllAbouts,
  updateAbout,
  deleteAbout,
  getAboutsForLoggedInUser,
} = require("../controllers/aboutController");
const authMiddleware = require("../middleware/authMiddleware"); // Use the authentication middleware

// All about routes are protected by authentication
router.post("/", authMiddleware, createAbout); // Create About (requires login)
router.get("/", authMiddleware, getAboutsForLoggedInUser); // Get Required About (requires login)
router.put("/:id", authMiddleware, updateAbout); // Update About (requires login)
router.delete("/:id", authMiddleware, deleteAbout); // Delete About (requires login)

module.exports = router;
