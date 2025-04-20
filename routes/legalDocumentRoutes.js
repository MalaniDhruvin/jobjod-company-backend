const express = require('express');
const router = express.Router();
const { addLegalDocument, getLegalDocuments } = require('../controllers/legalDocumentController');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Define routes
router.post('/', upload.any(), addLegalDocument); // POST /api/legal-documents
router.get('/:companyId', getLegalDocuments); // GET /api/legal-documents/:companyId

module.exports = router;