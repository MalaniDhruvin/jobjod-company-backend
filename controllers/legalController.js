const Legal = require("../models/legalModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create Legal (with file upload)
exports.createLegal = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { file } = req; // Multer adds the file to req
      const { userId } = req.body; // Extract userId from form-data

      // Validate input
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }
      if (!file) {
        return res.status(400).json({ message: "File is required." });
      }

      // Create the legal entry in the database
      const legal = await Legal.create({
        userId,
        fileName: file.originalname,
        filePath: file.path,
        mimeType: file.mimetype,
        fileSize: file.size,
      });

      res.status(201).json(legal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Get all legals
exports.getAllLegals = async (req, res) => {
  try {
    const legals = await Legal.findAll();
    res.status(200).json(legals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Legal
exports.deleteLegal = async (req, res) => {
  try {
    await Legal.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Legal deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
