const express = require("express");
const router = express.Router();
const {
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", createCompany);

router.get("/:userId", getCompany);

router.put("/:userId", authMiddleware, updateCompany);

router.delete("/:userId", authMiddleware, deleteCompany);

module.exports = router;
