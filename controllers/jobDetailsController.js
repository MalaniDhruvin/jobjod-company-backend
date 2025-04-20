  const {JobBasicInfo} = require("../models/jobBasicInfoModel");
  const {JobDescription} = require("../models/jobDescriptionModel");
//   const JobRequirements = require("../models/jobRequirementsModel");
    const {Company} = require("../models/companyModel");
  
  // API to get list of all jobs for the logged-in company
  exports.getJobPostingsForLoggedInCompany = async (req, res) => {
    // Assume companyId is available from the token/middleware as req.companyId
    const { companyId } = req.params;
    console.log("Company ID:", companyId);
  
    try {
      // Find all job postings by this company (using userId as company reference)
      const jobPostings = await JobBasicInfo.findAll({
        where: { userId: companyId },
        // No associations necessary for listing basic data only.
      });
      console.log("Job Postings:", jobPostings);
  
      if (!jobPostings.length) {
        return res
          .status(404)
          .json({ message: "No job postings found for this company" });
      }
  
      res.status(200).json(jobPostings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // API to get full details of a specific job using jobId
  exports.getJobPostingDetails = async (req, res) => {
    // Obtain jobId from URL parameters (e.g., /api/jobs/:jobId)
    const { jobId } = req.params;
  
    try {
      const jobDetails = await JobDescription.findOne({
        where: { id: jobId },
        // include: [
        // //   { model: JobExperience, as: 'experience' },
        //   { model: JobDescription, as: 'requirements' },
        // //   { model: JobRequirements, as: 'skills' },
        //   { model: Company, as: 'interviewDetails' }
        // ]
      });
  
      if (!jobDetails) {
        return res
          .status(404)
          .json({ message: "Job posting not found" });
      }
  
      res.status(200).json(jobDetails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  