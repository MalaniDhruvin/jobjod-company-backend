const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobBasicInfoController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobById);
router.put("/:id", authMiddleware, jobController.updateJob);
router.put("/:id/interviewPerson", authMiddleware, jobController.updateInterviewPerson);
router.delete("/:id", authMiddleware, jobController.deleteJob);

module.exports = router;
