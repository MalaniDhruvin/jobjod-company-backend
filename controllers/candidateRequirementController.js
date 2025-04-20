const { CandidateRequirement } = require("../models/candidateRequirementModel");

exports.createRequirement = async (req, res) => {
    try {
        const requirement = await CandidateRequirement.create(req.body);
        res.status(201).json({ message: "Requirement created successfully", requirement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRequirements = async (req, res) => {
    try {
        const requirements = await CandidateRequirement.findAll();
        res.status(200).json(requirements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRequirementById = async (req, res) => {
    try {
        const requirement = await CandidateRequirement.findByPk(req.params.id);
        if (!requirement) return res.status(404).json({ message: "Requirement not found" });
        res.status(200).json(requirement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRequirement = async (req, res) => {
    try {
        const requirement = await CandidateRequirement.findByPk(req.params.id);
        if (!requirement) return res.status(404).json({ message: "Requirement not found" });

        await requirement.update(req.body);
        res.status(200).json({ message: "Requirement updated successfully", requirement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRequirement = async (req, res) => {
    try {
        const requirement = await CandidateRequirement.findByPk(req.params.id);
        if (!requirement) return res.status(404).json({ message: "Requirement not found" });

        await requirement.destroy();
        res.status(200).json({ message: "Requirement deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
