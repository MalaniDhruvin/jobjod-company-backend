const { JobBasicInfo } = require("../models/jobBasicInfoModel");

exports.createJob = async (req, res) => {
  try {
    const job = await JobBasicInfo.create(req.body);
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobBasicInfo.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await JobBasicInfo.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await JobBasicInfo.findOne(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    await job.update(req.body);
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await JobBasicInfo.findOne(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    await job.destroy();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addApplicant = async (req, res) => {
  try {
    // Extract job id and applicant user id from the URL parameters.
    // For example, your route could be defined as: /api/jobs/:id/apply/:userId
    const { id, userId } = req.params;
    
    const job = await JobBasicInfo.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    let currentApplicants = job.appliedBy;
    if (!Array.isArray(currentApplicants)) {
      currentApplicants = [];
    }
    
    if (currentApplicants.includes(userId)) {
      return res.status(400).json({ message: "User already applied" });
    }

    currentApplicants.push(userId);  
    await job.update({ appliedBy: currentApplicants });
    
    res.status(200).json({
      message: "Applicant added successfully",
      job
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
