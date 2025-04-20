const express = require("express");
const router = express.Router();
const personalDetailsController = require("../controllers/personalDetailsController");
const authMiddleware = require("../middleware/authMiddleware"); // Use the authentication middleware

router.post("/", authMiddleware, personalDetailsController.createDetails);
router.get("/", authMiddleware, personalDetailsController.getDetails);
router.get("/:id", authMiddleware, personalDetailsController.getDetailsById);
router.put("/:id", authMiddleware, personalDetailsController.updateDetails);
router.delete("/:id", authMiddleware, personalDetailsController.deleteDetails);

module.exports = router;
