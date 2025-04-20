const Company = require("../models/companyModel");
require("dotenv").config();

// Create a new company
exports.createCompany = async (req, res) => {
  const {
    userId,
    companyName,
    interviewerName,
    email,
    phone,
    location,
    yearEst,
    website,
    pincode,
  } = req.body;

  try {
    // Check if the company already exists
    const existingCompany = await Company.findOne({ where: { userId: userId } });
    if (existingCompany) {
      return res.status(400).json({ message: "Company User Already Exists" });
    }

    // Create new company
    const company = await Company.create({
      userId,
      companyName,
      interviewerName,
      email,
      phone,
      location,
      yearEst,
      website,
      pincode,
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get company details by userId
exports.getCompany = async (req, res) => {
  const { userId } = req.params;  // Extract userId from the request params

  try {
    const company = await Company.findOne({ where: { userId: userId } });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update company details by userId
exports.updateCompany = async (req, res) => {
  const { userId } = req.params;  // Extract userId from the request params
  const {
    companyName,
    interviewerName,
    email,
    phone,
    location,
    yearEst,
    website,
    pincode,
  } = req.body;

  try {
    const company = await Company.findOne({ userId });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Update company details
    company.companyName = companyName || company.companyName;
    company.interviewerName = interviewerName || company.interviewerName;
    company.email = email || company.email;
    company.phone = phone || company.phone;
    company.location = location || company.location;
    company.yearEst = yearEst || company.yearEst;
    company.website = website || company.website;
    company.pincode = pincode || company.pincode;

    // Save the updated company
    await company.save();

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete company by userId
exports.deleteCompany = async (req, res) => {
  const { userId } = req.params;  // Extract userId from the request params

  try {
    const company = await Company.findOne({ userId });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Delete the company
    await company.remove();

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
