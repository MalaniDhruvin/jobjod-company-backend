const CompanyOverview = require("../models/companyOverviewModel");

// Global CRUD operations
exports.createCompanyOverview = async (req, res) => {
  try {
    const { userId, companyIndustry, overview, vision, mission } = req.body;
    const newCompany = await CompanyOverview.create({
      userId,
      companyIndustry,
      overview,
      vision,
      mission,
    });
    res.status(201).json({
      message: "Company overview saved successfully!",
      data: newCompany,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCompanyOverviews = async (req, res) => {
  try {
    const companies = await CompanyOverview.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompanyOverviewById = async (req, res) => {
  try {
    const company = await CompanyOverview.findOne({
      where: { id:req.params.userId }, // Use user_id instead of id
    });
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCompanyOverview = async (req, res) => {
  try {
    const { companyIndustry, overview, vision, mission } = req.body;
    const company = await CompanyOverview.findByPk(req.params.userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });

    company.companyIndustry = companyIndustry || company.companyIndustry;
    company.overview = overview || company.overview;
    company.vision = vision || company.vision;
    company.mission = mission || company.mission;
    await company.save();

    res.status(200).json({
      message: "Company overview updated successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCompanyOverview = async (req, res) => {
  try {
    const company = await CompanyOverview.findByPk(req.params.userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });

    await company.destroy();
    res.status(200).json({ message: "Company overview deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Company Industry CRUD
exports.createCompanyIndustry = async (req, res) => {
  try {
    const { userId, companyIndustry } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company) {
      const newCompany = await CompanyOverview.create({
        userId,
        companyIndustry: Array.isArray(companyIndustry)
          ? companyIndustry
          : [companyIndustry],
      });
      return res.status(201).json(newCompany);
    }

    company.companyIndustry = Array.isArray(company.companyIndustry)
      ? [...company.companyIndustry, companyIndustry]
      : [companyIndustry];
    await company.save();
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.handleCompanyIndustry = async (req, res) => {
  try {
    const { userId, companyIndustry } = req.body;
    console.log("Incoming request:", { userId, companyIndustry });

    const company = await CompanyOverview.findByPk(userId);

    if (!company) {
      const newCompany = await CompanyOverview.create({
        userId,
        companyIndustry: Array.isArray(companyIndustry)
          ? companyIndustry
          : [companyIndustry],
      });
      console.log(
        "New company created with industries:",
        newCompany.companyIndustry
      );
      return res.status(201).json({
        message: "Company created with industry",
        data: newCompany,
      });
    }

    // Log the raw company object to see what’s really there
    const rawCompany = company.toJSON();
    console.log("Raw company object from DB:", rawCompany);
    console.log(
      "Current companyIndustry before append:",
      company.companyIndustry
    );

    // Parse companyIndustry if it’s a string, otherwise use as-is
    let currentIndustries;
    if (typeof rawCompany.companyIndustry === "string") {
      try {
        currentIndustries = JSON.parse(rawCompany.companyIndustry);
        if (!Array.isArray(currentIndustries)) {
          currentIndustries = []; // Fallback if parsed value isn’t an array
        }
      } catch (e) {
        console.error("Failed to parse companyIndustry:", e);
        currentIndustries = [];
      }
    } else if (Array.isArray(rawCompany.companyIndustry)) {
      currentIndustries = rawCompany.companyIndustry;
    } else {
      currentIndustries = [];
    }
    console.log("Parsed current industries:", currentIndustries);

    // Convert new companyIndustry to an array if it isn’t already
    const newIndustries = Array.isArray(companyIndustry)
      ? companyIndustry
      : [companyIndustry];
    console.log("New industries to append:", newIndustries);

    // Append new industries to existing ones
    const updatedIndustries = currentIndustries.concat(newIndustries);
    console.log("Combined industries using concat:", updatedIndustries);

    // Assign the updated array to the company object
    company.companyIndustry = updatedIndustries;

    // Mark the field as changed to ensure Sequelize saves it
    company.changed("companyIndustry", true);

    // Log the state before saving
    console.log("Company object before save:", company.companyIndustry);

    // Save the changes
    await company.save();

    // Log the state after saving
    console.log("Company object after save:", company.companyIndustry);

    res.status(200).json({
      message: "Company industry appended successfully",
      data: company,
    });
  } catch (error) {
    console.error("Error in handleCompanyIndustry:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCompanyIndustry = async (req, res) => {
  try {
    const company = await CompanyOverview.findByPk(req.params.userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });
    res.status(200).json({ companyIndustry: company.companyIndustry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCompanyIndustry = async (req, res) => {
  try {
    const { userId, companyIndustry } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });

    company.companyIndustry = companyIndustry;
    await company.save();
    res.status(200).json({
      message: "Company industry updated successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCompanyIndustry = async (req, res) => {
  try {
    const { userId, industryValue } = req.body;

    // Find the company
    const company = await CompanyOverview.findOne({
      where: { userId: userId },
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Get current industries (assuming it's stored as JSON string in MySQL)
    let currentIndustries = company.companyIndustry;

    // If it's a string, parse it; if not, use it directly
    if (typeof currentIndustries === "string") {
      currentIndustries = JSON.parse(currentIndustries || "[]");
    }

    // Filter out the industry to delete
    const updatedIndustries = currentIndustries.filter(
      (industry) => industry !== industryValue
    );

    // Update the company with the new array
    await company.update({
      companyIndustry: JSON.stringify(updatedIndustries), // Convert back to JSON string for MySQL
    });

    res.status(200).json({
      message: "Industry deleted successfully",
      updatedIndustries: updatedIndustries,
    });
  } catch (error) {
    console.error("Error deleting industry:", error);
    res.status(500).json({ error: "Error deleting industry" });
  }
};

// Overview CRUD
exports.createOverview = async (req, res) => {
  try {
    const { userId, overview } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company) {
      const newCompany = await CompanyOverview.create({ userId, overview });
      return res.status(201).json(newCompany);
    }

    company.overview = overview;
    await company.save();
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOverview = async (req, res) => {
  try {
    const company = await CompanyOverview.findByPk(req.params.userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });
    res.status(200).json({ overview: company.overview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOverview = async (req, res) => {
  try {
    const { userId, overview } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });

    company.overview = overview;
    await company.save();
    res.status(200).json({
      message: "Overview updated successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOverview = async (req, res) => {
  try {
    const { userId } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });

    company.overview = null;
    await company.save();
    res.status(200).json({
      message: "Overview deleted successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Vision CRUD
exports.createVision = async (req, res) => {
  try {
    const { userId, vision } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company) {
      const newCompany = await CompanyOverview.create({ userId, vision });
      return res.status(201).json(newCompany);
    }

    company.vision = vision;
    await company.save();
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVision = async (req, res) => {
  try {
    const company = await CompanyOverview.findByPk(req.params.userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });
    res.status(200).json({ vision: company.vision });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVision = async (req, res) => {
  try {
    const { userId, vision } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });

    company.vision = vision;
    await company.save();
    res.status(200).json({
      message: "Vision updated successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVision = async (req, res) => {
  try {
    const { userId } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });

    company.vision = null;
    await company.save();
    res.status(200).json({
      message: "Vision deleted successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mission CRUD
exports.createMission = async (req, res) => {
  try {
    const { userId, mission } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company) {
      const newCompany = await CompanyOverview.create({ userId, mission });
      return res.status(201).json(newCompany);
    }

    company.mission = mission;
    await company.save();
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMission = async (req, res) => {
  try {
    const company = await CompanyOverview.findByPk(req.params.userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });
    res.status(200).json({ mission: company.mission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMission = async (req, res) => {
  try {
    const { userId, mission } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });

    company.mission = mission;
    await company.save();
    res.status(200).json({
      message: "Mission updated successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMission = async (req, res) => {
  try {
    const { userId } = req.body;
    const company = await CompanyOverview.findByPk(userId);
    if (!company)
      return res.status(404).json({ message: "Company overview not found" });

    company.mission = null;
    await company.save();
    res.status(200).json({
      message: "Mission deleted successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
