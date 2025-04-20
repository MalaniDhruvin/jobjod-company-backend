const Recognition = require("../models/recognitionModel");

// Create Recognitions
exports.createRecognitions = async (req, res) => {
  const { recognitionEntries } = req.body;

  if (!Array.isArray(recognitionEntries) || recognitionEntries.length === 0) {
    return res.status(400).json({ message: "Invalid data format." });
  }

  try {
    const recognition = await Recognition.bulkCreate(recognitionEntries);
    res.status(201).json(recognition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a single Recognition
exports.createRecognition = async (req, res) => {
  const { title, achievementDate, description } = req.body;

  // Check if all necessary fields are provided
  if (!title || !achievementDate || !description) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Create a new recognition entry
    const recognition = await Recognition.create(req.body);

    // Return the newly created recognition
    res.status(201).json(recognition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all experiences for the logged-in user (using userId from token)
exports.getRecognitionForLoggedInUser = async (req, res) => {
  const userId = req.params.userId; // Access userId from the authenticated token

  try {
    // Fetch experiences based on the logged-in user's userId
    const recognitionRecords = await Recognition.findAll({ where: { userId } });

    if (!recognitionRecords.length) {
      return res
        .status(404)
        .json({ message: "No experiences found for this user" });
    }

    res.status(200).json(recognitionRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all recognition records
exports.getAllRecognition = async (req, res) => {
  try {
    const recognitionRecords = await Recognition.findAll();
    res.status(200).json(recognitionRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Recognition
exports.updateRecognition = async (req, res) => {
  try {
    const recognition = await Recognition.update(req.body, {
      where: { id: req.params.id },
    });

    const recognitionRecords = await Recognition.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(recognitionRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Recognition
exports.deleteRecognition = async (req, res) => {
  try {
    await Recognition.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Recognition record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
