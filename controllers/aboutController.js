const About = require("../models/aboutModel");

// Create About
exports.createAbout = async (req, res) => {
  try {
    const about = await About.create(req.body);
    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all abouts for the logged-in user (using userId from token)
exports.getAboutsForLoggedInUser = async (req, res) => {
  const userId = req.userId; // Access userId from the authenticated token

  try {
    // Fetch abouts based on the logged-in user's userId
    const abouts = await About.findAll({ where: { userId } });

    if (!abouts.length) {
      return res
        .status(404)
        .json({ message: "No abouts found for this user" });
    }

    res.status(200).json(abouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all abouts
exports.getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.findAll();
    res.status(200).json(abouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update About
exports.updateAbout = async (req, res) => {
  try {
    const about = await About.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete About
exports.deleteAbout = async (req, res) => {
  try {
    await About.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "About deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
