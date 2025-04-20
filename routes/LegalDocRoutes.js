const express = require('express');
const router = express.Router();
const multer = require('multer');
const legalDocController = require('../controllers/LegalDocController');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',  // Directory where files will be stored
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name with timestamp
  }
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB limit for files

// Routes
router.post('/', upload.any(), legalDocController.createLegalDocuments);  // Create documents
router.get('/:userId', legalDocController.getUserDocuments);  // Get all documents for a user
router.put('/:documentId', upload.single('file'), legalDocController.updateLegalDocument);  // Update specific document
router.delete('/:documentId', legalDocController.deleteLegalDocument);  // Delete specific document

module.exports = router;
