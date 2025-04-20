const { Job } = require("../models/jobsModel"); // Import the correct model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a new company job posting
exports.createJobPosting = async (req, res) => {
  const {
    jobTitle,
    interviewPersonName,
    industry,
    department,
    expiryTime,
    joiningDate,
    salary,
    noticePeriod,
  } = req.body;

  try {
    // Create a new job posting in the Company table
    const companyJobPosting = await Company.create({
      jobTitle,
      interviewPersonName,
      industry,
      department,
      expiryTime,
      joiningDate,
      salary,
      noticePeriod,
    });

    res.status(201).json(companyJobPosting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login company and generate JWT token
exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ where: { email } });
    if (!company) {
      return res.status(400).json({ message: "Company not found" });
    }

    // Compare password (for company)
    const isValid = await bcrypt.compare(password, company.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for company
    const token = jwt.sign({ companyId: company.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the token
    res.status(200).json({ role: "Company", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all job postings for a company (logged-in company)
exports.getJobPostingsForLoggedInCompany = async (req, res) => {
  const companyId = req.companyId; // Access companyId from the authenticated token

  try {
    // Fetch job postings based on the logged-in company's companyId
    const jobPostings = await Company.findAll({ where: { companyId } });

    if (!jobPostings.length) {
      return res
        .status(404)
        .json({ message: "No job postings found for this company" });
    }

    res.status(200).json(jobPostings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a job posting for a company by companyId (ensure it's the logged-in company's job posting)
exports.updateJobPosting = async (req, res) => {
  const companyId = req.companyId; // Access companyId from the authenticated token

  try {
    // Fetch the job posting by companyId and jobId
    const jobPosting = await Company.findOne({
      where: { companyId, id: req.params.id },
    });

    if (!jobPosting) {
      return res
        .status(404)
        .json({ message: "Job posting not found or you're not authorized" });
    }

    // Update the job posting
    const updatedJobPosting = await Company.update(req.body, {
      where: { companyId, id: req.params.id },
    });

    res.status(200).json({ message: "Job posting updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job posting for a company by companyId (ensure it's the logged-in company's job posting)
exports.deleteJobPosting = async (req, res) => {
  const companyId = req.companyId; // Access companyId from the authenticated token

  try {
    // Check if the job posting belongs to the logged-in company
    const jobPosting = await Company.findOne({
      where: { companyId, id: req.params.id },
    });

    if (!jobPosting) {
      return res
        .status(404)
        .json({ message: "Job posting not found or you're not authorized" });
    }

    // Delete the job posting if it belongs to the logged-in company
    await Company.destroy({
      where: { companyId, id: req.params.id },
    });

    res.status(200).json({ message: "Job posting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
