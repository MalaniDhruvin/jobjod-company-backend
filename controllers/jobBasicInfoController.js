const { JobBasicInfo } = require("../models/jobBasicInfoModel");
const { Op, fn, col, where } = require('sequelize');

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

// controllers/jobController.js
// controllers/jobController.js

exports.updateJob = async (req, res) => {
  try {
    // 1) Find the existing record
    const job = await JobBasicInfo.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 2) Whitelist and collect updatable fields
    const updatable = {};
    if (req.body.jobTitle   !== undefined) updatable.jobTitle   = req.body.jobTitle;
    if (req.body.expiryTime !== undefined) updatable.expiryTime = req.body.expiryTime;
    if (req.body.minSalary  !== undefined) updatable.minSalary  = req.body.minSalary;
    if (req.body.maxSalary  !== undefined) updatable.maxSalary  = req.body.maxSalary;

    // 3) Apply everything *except* createdAt via update()
    if (Object.keys(updatable).length) {
      await job.update(updatable);
    }

    // 4) Handle createdAt specially
    if (req.body.createdAt !== undefined) {
      // convert incoming ISO or timestamp string to a Date
      const newCreatedAt = new Date(req.body.createdAt);
      job.setDataValue('createdAt', newCreatedAt);
      // `silent: true` tells Sequelize not to bump updatedAt
      await job.save({ silent: true });
    }

    // 5) Return the fresh record
    return res
      .status(200)
      .json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ error: error.message });
  }
};

// controllers/jobController.js

exports.findByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    console.log('Title from URL-param:', title);

    if (!title) {
      return res.status(400).json({
        message: 'Path parameter `title` is required',
      });
    }

    // 1) Fetch all rows
    const allJobs = await JobBasicInfo.findAll({
      order: [['createdAt', 'DESC']],
    });

    // 2) In JS, parse the JSON column and filter
    const matching = allJobs.filter((job) => {
      try {
        const parsed = typeof job.jobTitle === 'string'
          ? JSON.parse(job.jobTitle)
          : job.jobTitle;
        return parsed.label === title;
      } catch (e) {
        return false;
      }
    });

    if (!matching.length) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.json(matching);
  } catch (err) {
    console.error('Error fetching jobs by title:', err);
    return res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};



// controllers/jobController.js

exports.updateInterviewPerson = async (req, res) => {
  let { interviewPersons } = req.body;
  // interviewPersons should be an array of objects: [{ name, ... }, ...]

  if (!Array.isArray(interviewPersons)) {
    return res
      .status(400)
      .json({ message: 'interviewPersons must be an array' });
  }

  // Extract only the `name` field from each object
  const namesArray = interviewPersons.reduce((acc, entry, idx) => {
    if (entry && typeof entry.name === 'string' && entry.name.trim()) {
      acc.push(entry.name.trim());
    } else {
      console.warn(`Skipping invalid entry at index ${idx}:`, entry);
    }
    return acc;
  }, []);

  if (namesArray.length === 0) {
    return res
      .status(400)
      .json({ message: 'No valid names provided' });
  }

  try {
    const job = await JobBasicInfo.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Update the column that stores an array of names
    await job.update({ interviewPersons: namesArray });

    // Respond with the names array that was saved
    return res
      .status(200)
      .json({ 
        message: 'Interview persons updated', 
        interviewPersons: job 
      });
  } catch (error) {
    console.error('Error updating interviewPersons:', error);
    return res.status(500).json({ error: error.message });
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
