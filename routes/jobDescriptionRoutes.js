const express = require("express");
const router = express.Router();
const jobDescriptionController = require("../controllers/jobDescriptionController");

router.post("/", jobDescriptionController.createJobDescription);
router.get("/", jobDescriptionController.getJobDescriptions);
router.get("/:id", jobDescriptionController.getJobDescriptionById);
router.put("/:id", jobDescriptionController.updateJobDescription);
router.delete("/:id", jobDescriptionController.deleteJobDescription);

module.exports = router;
