const { JobDescription } = require("../models/jobDescriptionModel");

exports.createJobDescription = async (req, res) => {
    try {
        const jobDescription = await JobDescription.create(req.body);
        res.status(201).json({ message: "Job description created successfully", jobDescription });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJobDescriptions = async (req, res) => {
    try {
        const jobDescriptions = await JobDescription.findAll();
        res.status(200).json(jobDescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJobDescriptionById = async (req, res) => {
    try {
        const jobDescription = await JobDescription.findByPk(req.params.id);
        if (!jobDescription) return res.status(404).json({ message: "Job description not found" });
        res.status(200).json(jobDescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateJobDescription = async (req, res) => {
    try {
        const jobDescription = await JobDescription.findByPk(req.params.id);
        if (!jobDescription) return res.status(404).json({ message: "Job description not found" });

        await jobDescription.update(req.body);
        res.status(200).json({ message: "Job description updated successfully", jobDescription });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteJobDescription = async (req, res) => {
    try {
        const jobDescription = await JobDescription.findByPk(req.params.id);
        if (!jobDescription) return res.status(404).json({ message: "Job description not found" });

        await jobDescription.destroy();
        res.status(200).json({ message: "Job description deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
