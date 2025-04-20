const JobSchedule = require("../models/JobSchedule");

// Create Job Schedule
exports.createJobSchedule = async (req, res) => {
  try {
    // const { jobTiming, interviewTiming, interviewLocation, instructions } = req.body;
    const jobSchedule = await JobSchedule.create(req.body);
    res.status(201).json(jobSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Job Schedules
exports.getAllJobSchedules = async (req, res) => {
  try {
    const jobSchedules = await JobSchedule.findAll();
    res.status(200).json(jobSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Job Schedule by ID
exports.getJobScheduleById = async (req, res) => {
  try {
    const jobSchedule = await JobSchedule.findOne({ id: req.params.jobId });
    if (!jobSchedule) return res.status(404).json({ error: "Job schedule not found" });
    res.status(200).json(jobSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Job Schedule
exports.updateJobSchedule = async (req, res) => {
  try {
    const { jobTiming, interviewTiming, interviewLocation, instructions } = req.body;
    const jobSchedule = await JobSchedule.findByPk(req.params.id);
    if (!jobSchedule) return res.status(404).json({ error: "Job schedule not found" });

    await jobSchedule.update({ jobTiming, interviewTiming, interviewLocation, instructions });
    res.status(200).json(jobSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Job Schedule
exports.deleteJobSchedule = async (req, res) => {
  try {
    const jobSchedule = await JobSchedule.findByPk(req.params.id);
    if (!jobSchedule) return res.status(404).json({ error: "Job schedule not found" });

    await jobSchedule.destroy();
    res.status(200).json({ message: "Job schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
