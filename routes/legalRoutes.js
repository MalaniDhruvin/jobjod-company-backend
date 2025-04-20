const express = require("express");
const router = express.Router();
const {
  createLegal,
  getAllLegals,
  deleteLegal,
} = require("../controllers/legalController");
const authMiddleware = require("../middleware/authMiddleware"); // Use the authentication middleware

// All legal routes are protected by authentication
router.post("/", authMiddleware, createLegal); // Create Legal (requires login)
router.get("/", authMiddleware, getAllLegals); // Get all Legals (requires login)
router.delete("/:id", authMiddleware, deleteLegal); // Delete Legal (requires login)

module.exports = router;
