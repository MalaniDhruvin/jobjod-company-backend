const { PersonalDetails } = require("../models/personalDetailsModel");

exports.createDetails = async (req, res) => {
    try {
        const details = await PersonalDetails.create(req.body);
        res.status(201).json({ message: "Details created successfully", details });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDetails = async (req, res) => {
    try {
        const details = await PersonalDetails.findAll();
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDetailsById = async (req, res) => {
    try {
        const details = await PersonalDetails.findByPk(req.params.id);
        if (!details) return res.status(404).json({ message: "Details not found" });
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDetails = async (req, res) => {
    try {
        const details = await PersonalDetails.findByPk(req.params.id);
        if (!details) return res.status(404).json({ message: "Details not found" });

        await details.update(req.body);
        res.status(200).json({ message: "Details updated successfully", details });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteDetails = async (req, res) => {
    try {
        const details = await PersonalDetails.findByPk(req.params.id);
        if (!details) return res.status(404).json({ message: "Details not found" });

        await details.destroy();
        res.status(200).json({ message: "Details deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
