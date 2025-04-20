const express = require("express");
const router = express.Router();
const candidateRequirementController = require("../controllers/candidateRequirementController");
const authMiddleware = require("../middleware/authMiddleware"); // Use the authentication middleware

router.post(
  "/",
  authMiddleware,
  candidateRequirementController.createRequirement
);
router.get("/", authMiddleware, candidateRequirementController.getRequirements);
router.get(
  "/:id",
  authMiddleware,
  candidateRequirementController.getRequirementById
);
router.put(
  "/:id",
  authMiddleware,
  candidateRequirementController.updateRequirement
);
router.delete(
  "/:id",
  authMiddleware,
  candidateRequirementController.deleteRequirement
);

module.exports = router;
