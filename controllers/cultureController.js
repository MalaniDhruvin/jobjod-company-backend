const Culture = require("../models/cultureModel");

// Create Culture
exports.createCulture = async (req, res) => {
  try {
    const culture = await Culture.create(req.body);
    res.status(201).json(culture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Cultures
exports.getAllCultures = async (req, res) => {
  try {
    const cultures = await Culture.findAll();
    res.status(200).json(cultures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Culture for editing
exports.getCulture = async (req, res) => {
  try {
    const culture = await Culture.findAll({
      where: { userId: req.params.userId }, // Use user_id instead of id
    });
    if (!culture) {
      return res.status(404).json({ message: "Culture not found" });
    }
    res.status(200).json(culture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Culture (partial update for individual columns)
exports.updateCulture = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Client sends only the fields to update

    const [updated] = await Culture.update(updateData, {
      where: { id },
    });

    if (updated) {
      const updatedCulture = await Culture.findByPk(id);
      res.status(200).json(updatedCulture);
    } else {
      res.status(404).json({ message: "Culture not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Culture
exports.deleteCulture = async (req, res) => {
  const { field } = req.query;
  const allowed = ['companyEnvironment','employeeBenefits','careerDevelopment'];
  if (!allowed.includes(field)) {
    return res.status(400).json({ message: `Invalid field. Must be one of: ${allowed.join(', ')}` });
  }

  try {
    const culture = await Culture.findByPk(req.params.id);
    if (!culture) {
      return res.status(404).json({ message: 'Culture not found' });
    }

    // Set that one column to empty string (or null, if you prefer)
    await culture.update({ [field]: '' });

    // Rebuild your front-end-friendly array
    const result = [];
    if (culture.companyEnvironment) {
      result.push({ id: 1, title: 'Company Environment', content: culture.companyEnvironment });
    }
    if (culture.employeeBenefits) {
      result.push({ id: 2, title: 'Employee Benefits', content: culture.employeeBenefits });
    }
    if (culture.careerDevelopment) {
      result.push({ id: 3, title: 'Career Development', content: culture.careerDevelopment });
    }

    return res.status(200).json({
      message: `Cleared ${field}`,
      data: result
    });
  } catch (err) {
    console.error('Error clearing culture field:', err);
    return res.status(500).json({ message: err.message });
  }
};