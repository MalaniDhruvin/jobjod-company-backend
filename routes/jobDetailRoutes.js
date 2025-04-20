const express = require("express");
const router = express.Router();
const jobDescriptionController = require("../controllers/jobDetailsController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/job/:jobId", authMiddleware, jobDescriptionController.getJobPostingDetails);
router.get("/job/by-company/:companyId", authMiddleware, jobDescriptionController.getJobPostingsForLoggedInCompany);


module.exports = router;