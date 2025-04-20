const express = require("express");
const router = express.Router();
const jobScheduleController = require("../controllers/jobScheduleController");

router.post("/", jobScheduleController.createJobSchedule);
router.get("/", jobScheduleController.getAllJobSchedules);
router.get("/:id", jobScheduleController.getJobScheduleById);
router.put("/:id", jobScheduleController.updateJobSchedule);
router.delete("/:id", jobScheduleController.deleteJobSchedule);

module.exports = router;
