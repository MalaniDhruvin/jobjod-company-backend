const { JobDescription } = require("../models/jobDescriptionModel");

exports.createJobDescription = async (req, res) => {
    try {
        const jobDescription = await JobDescription.create(req.body);
        res.status(201).json({ message: "Job description created successfully", jobDescription });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJobDescriptions = async (req, res) => {
    try {
        const jobDescriptions = await JobDescription.findAll();
        res.status(200).json(jobDescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJobDescriptionById = async (req, res) => {
    try {
        const jobDescription = await JobDescription.findByPk(req.params.id);
        if (!jobDescription) return res.status(404).json({ message: "Job description not found" });
        res.status(200).json(jobDescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// controllers/jobDescriptionController.js

exports.updateJobDescription = async (req, res) => {
  const { skills, responsibility } = req.body;
  
  // Validate inputs
  if (skills !== undefined && !Array.isArray(skills)) {
    return res
      .status(400)
      .json({ message: "`skills` must be an array of strings" });
  }
  if (responsibility !== undefined && 
      !(typeof responsibility === 'string' || Array.isArray(responsibility))
  ) {
    return res
      .status(400)
      .json({ message: "`responsibility` must be a string or an array of strings" });
  }

  try {
    // 1) Find the JobDescription row by PK
    const jd = await JobDescription.findByPk(req.params.id);
    if (!jd) {
      return res.status(404).json({ message: "Job description not found" });
    }

    // 2) Build update payload
    const updates = {};

    if (skills !== undefined) {
      // uses your setter to join with commas
      updates.skills = skills;
    }
    if (responsibility !== undefined) {
      // if array, join to CSV; if string, leave as-is
      updates.responsibility = Array.isArray(responsibility)
        ? responsibility.join(',')
        : responsibility;
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ message: "No updatable fields provided" });
    }

    // 3) Apply updates
    await jd.update(updates);

    // 4) Read back and return the current getters
    return res.status(200).json({
      message: "Job description updated successfully",
      data: {
        id: jd.id,
        skills: jd.skills,             // array from getter
        responsibility: jd.responsibility
          ? jd.responsibility.split(',')
          : []
      }
    });
  } catch (err) {
    console.error("Error updating job description:", err);
    return res.status(500).json({ error: err.message });
  }
};


exports.deleteJobDescription = async (req, res) => {
    try {
        const jobDescription = await JobDescription.findByPk(req.params.id);
        if (!jobDescription) return res.status(404).json({ message: "Job description not found" });

        await jobDescription.destroy();
        res.status(200).json({ message: "Job description deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.matchUserSkills = async (req, res) => {
  const { userSkills } = req.body;

  console.log("User skills:", userSkills);
  if (!Array.isArray(userSkills)) {
    return res
      .status(400)
      .json({ message: "`userSkills` must be an array of strings" });
  }

  const userSkillSet = new Set(
    userSkills
      .filter((s) => typeof s === "string")
      .map((s) => s.trim().toLowerCase())
  );

  console.log("User skill set:", userSkillSet);

  try {
    const jobDescriptions = await JobDescription.findAll();

    // console.log("Job descriptions:", jobDescriptions);

    const results = jobDescriptions.map((jd) => {
      const required = Array.isArray(jd.skills)
        ? jd.skills.map((s) => s.trim().toLowerCase())
        : [];

      // count how many required skills the user has
      const matchCount = required.filter((skill) =>
        userSkillSet.has(skill)
      ).length;

      // if two or more match, it's a "yes"
      const atLeastTwo = matchCount >= 1;

      return {
        jobId: jd.id,
        match: atLeastTwo ? "yes" : "no",
      };
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error matching user skills:", error);
    return res.status(500).json({ error: error.message });
  }
};
