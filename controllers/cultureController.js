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
    const culture = await Culture.findOne({
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
  try {
    const deleted = await Culture.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "Culture deleted" });
    } else {
      res.status(404).json({ message: "Culture not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};