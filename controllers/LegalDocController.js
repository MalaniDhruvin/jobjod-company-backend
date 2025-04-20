const LegalDocument = require('../models/LegalDoc'); // Sequelize model
const path = require('path');
const fs = require('fs');

// Helper function to ensure upload directory exists
const ensureUploadDir = () => {
  const uploadDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
};

// Create legal documents
const createLegalDocuments = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    ensureUploadDir();

    // Array to store document creation promises
    const documentPromises = [];

    // Process form data
    Object.keys(req.body).forEach(key => {
      if (key.endsWith('_number')) {
        const docType = key.replace('_number', '');
        const docNumber = req.body[key];

        // Find corresponding file if uploaded
        const file = req.files.find(f => f.fieldname === `${docType}_file`);

        documentPromises.push(
          LegalDocument.create({
            userId,
            documentType: docType,
            documentNumber: docNumber,
            filePath: file ? `/uploads/${file.filename}` : null
          })
        );
      }
    });

    // Execute all document creation promises
    const createdDocuments = await Promise.all(documentPromises);

    res.status(201).json({
      message: 'Documents saved successfully',
      data: createdDocuments
    });
  } catch (error) {
    console.error('Error in createLegalDocuments:', error);
    res.status(500).json({
      error: 'Failed to save documents',
      details: error.message
    });
  }
};

// Get all documents for a user
const getUserDocuments = async (req, res) => {
  try {
    const { userId } = req.params;

    const documents = await LegalDocument.findAll({
      where: { userId }
    });

    if (!documents.length) {
      return res.status(404).json({ message: 'No documents found for this user' });
    }

    res.status(200).json({
      message: 'Documents retrieved successfully',
      data: documents
    });
  } catch (error) {
    console.error('Error in getUserDocuments:', error);
    res.status(500).json({
      error: 'Failed to retrieve documents',
      details: error.message
    });
  }
};

// Update legal document
const updateLegalDocument = async (req, res) => {
  try {
    const { documentId } = req.params; // Get documentId from URL params
    const { userId, documentType, documentNumber } = req.body; // Get data from body

    const file = req.file; // Get file from request (if uploaded)

    // Find the document to update
    const document = await LegalDocument.findByPk(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Ensure the document belongs to the correct user
    if (document.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to edit this document' });
    }

    // Update the document fields
    document.documentType = documentType || document.documentType;
    document.documentNumber = documentNumber || document.documentNumber;

    // Handle file upload (update file if provided)
    if (file) {
      // Delete old file if exists
      if (document.filePath) {
        const oldFilePath = path.join(__dirname, '..', document.filePath);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Update the file path
      document.filePath = `/uploads/${file.filename}`;
    }

    // Save the updated document
    await document.save();

    res.status(200).json({
      message: 'Document updated successfully',
      data: document
    });
  } catch (error) {
    console.error('Error in updateLegalDocument:', error);
    res.status(500).json({
      error: 'Failed to update document',
      details: error.message
    });
  }
};

// Delete legal document
const deleteLegalDocument = async (req, res) => {
  try {
    const { documentId } = req.params; // Get documentId from URL params
    const { userId } = req.body; // Get userId from body

    // Find the document to delete
    const document = await LegalDocument.findByPk(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Ensure the document belongs to the correct user
    if (document.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this document' });
    }

    // Delete the file from the file system if it exists
    if (document.filePath) {
      const filePath = path.join(__dirname, '..', document.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete the file
      }
    }

    // Delete the document from the database
    await document.destroy();

    res.status(200).json({
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteLegalDocument:', error);
    res.status(500).json({
      error: 'Failed to delete document',
      details: error.message
    });
  }
};

module.exports = {
  createLegalDocuments,
  getUserDocuments,
  updateLegalDocument,
  deleteLegalDocument
};
