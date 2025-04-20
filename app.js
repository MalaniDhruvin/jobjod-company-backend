const express = require("express");
const app = express();
const sequelize = require("./config/db");
const cors = require("cors");

// Import routes
const companyRoutes = require("./routes/companyRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const recognitionRoutes = require("./routes/recognitionRoutes");
const cultureRoutes = require("./routes/culturesRoutes");
const legalRoutes = require("./routes/legalRoutes");
const loginRoutes = require("./routes/loginRoutes");
const companyOverviewRoutes = require("./routes/companyOverviewRoutes");
const legalDocumentRoutes = require("./routes/legalDocumentRoutes");
const jobRoutes = require("./routes/jobBasicInfoRoutes");
const candidateRequirementRoutes = require("./routes/candidateRequirementRoutes");
const personalDetailsRoutes = require("./routes/personalDetailsRoutes");
const jobDescriptionRoutes = require("./routes/jobDescriptionRoutes");
const jobScheduleRoutes = require("./routes/jobScheduleRoutes");
const legalDocumentsRouter = require("./routes/LegalDocRoutes");
const getJobDetailsRouter = require("./routes/jobDetailRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Middleware
app.use(cors());

app.use("/api/otp", loginRoutes); // OTP based login/signup
app.use("/api/company", companyRoutes); // Public routes for company login
app.use("/api/about", aboutRoutes); // Protected routes for abouts
app.use("/api/recognition", recognitionRoutes); // Protected routes for recognition
app.use("/api/culture", cultureRoutes); // Protected routes for cultures
// app.use("/api/legal", legalRoutes); // Protected routes for legals
app.use("/api/company-overview", companyOverviewRoutes);
// app.use("/api/legal-documents", legalDocumentRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/requirements", candidateRequirementRoutes);
app.use("/api/personal-details", personalDetailsRoutes);
app.use("/api/job-description", jobDescriptionRoutes);
app.use("/api/job-schedule", jobScheduleRoutes);
app.use("/api", getJobDetailsRouter); // Protected routes for job details

app.use("/api/legaldocs", legalDocumentsRouter);

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
