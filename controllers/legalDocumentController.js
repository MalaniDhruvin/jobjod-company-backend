const LegalDocument = require("../models/LegalDocument");

// Helper function to get uploaded files dynamically
const getUploadedFiles = (req) => {
  const uploadedFiles = {};

  console.log("Uploaded Files:", req.files);

  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      uploadedFiles[file.fieldname] = file.path; // Save each file with its field name
    });
  }

  return uploadedFiles;
};

// Add Legal Document (Flexible Upload)
exports.addLegalDocument = async (req, res) => {
  try {
    const { userId, gstNumber, panNumber, fssaiNumber } = req.body; // Changed companyId to userId
    const uploadedFiles = getUploadedFiles(req);

    const document = await LegalDocument.create({
      userId, // Changed to userId to match the model
      gstNumber,
      panNumber,
      fssaiNumber,
      documents: uploadedFiles,
    });

    res.status(201).json({
      success: true,
      message: "Documents uploaded successfully",
      data: document,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Legal Documents by User ID
exports.getLegalDocuments = async (req, res) => {
  try {
    const { userId } = req.params; // Changed companyId to userId
    const document = await LegalDocument.findOne({ where: { userId } });

    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "No documents found" });
    }

    res.status(200).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};