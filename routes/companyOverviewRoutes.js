const express = require("express");
const router = express.Router();
const companyOverviewController = require("../controllers/companyOverviewController");
const authMiddleware = require("../middleware/authMiddleware"); // Use the authentication middleware

// Debug: Log the controller to ensure it's loaded
// console.log("Loaded companyOverviewController:", companyOverviewController);

// Global CRUD operations for Company Overview
router.post(
  "/",
  authMiddleware,
  companyOverviewController.createCompanyOverview
);

router.post(
  "/industry",
  authMiddleware,
  companyOverviewController.createCompanyIndustry
);
router.get(
  "/",
  authMiddleware,
  companyOverviewController.getAllCompanyOverviews
);

router.get(
  "/:userId",
  companyOverviewController.getCompanyOverviewById
);

router.put(
  "/:userId",
  authMiddleware,
  companyOverviewController.updateCompanyOverview
);
router.delete(
  "/:userId",
  authMiddleware,
  companyOverviewController.deleteCompanyOverview
);

// Individual CRUD operations for companyIndustry
router.post(
  "/industry/create",
  authMiddleware,
  companyOverviewController.handleCompanyIndustry
);
router.get(
  "/industry/:userId",
  authMiddleware,
  companyOverviewController.getCompanyIndustry
);
router.put(
  "/industry",
  authMiddleware,
  companyOverviewController.updateCompanyIndustry
);
router.delete(
  "/industry",
  authMiddleware,
  companyOverviewController.deleteCompanyIndustry
);

// Individual CRUD operations for overview
router.post(
  "/overview/create",
  authMiddleware,
  companyOverviewController.createOverview
);
router.get(
  "/overview/:userId",
  authMiddleware,
  companyOverviewController.getOverview
);
router.put(
  "/overview",
  authMiddleware,
  companyOverviewController.updateOverview
);
router.delete(
  "/overview",
  authMiddleware,
  companyOverviewController.deleteOverview
);

// Individual CRUD operations for vision
router.post(
  "/vision/create",
  authMiddleware,
  companyOverviewController.createVision
);
router.get(
  "/vision/:userId",
  authMiddleware,
  companyOverviewController.getVision
);
router.put("/vision", authMiddleware, companyOverviewController.updateVision);
router.delete(
  "/vision",
  authMiddleware,
  companyOverviewController.deleteVision
);

// Individual CRUD operations for mission
router.post(
  "/mission/create",
  authMiddleware,
  companyOverviewController.createMission
);
router.get(
  "/mission/:userId",
  authMiddleware,
  companyOverviewController.getMission
);
router.put("/mission", authMiddleware, companyOverviewController.updateMission);
router.delete(
  "/mission",
  authMiddleware,
  companyOverviewController.deleteMission
);

module.exports = router;
