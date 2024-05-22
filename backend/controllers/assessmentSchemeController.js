const mongoose = require('mongoose');
const AssessmentSchemes = require('../schemas/assessmentSchemeSchema');

// CRUD: Create
const createScheme = async (req, res) => {
    try {
        const schemeData = {
            'scheme-name': req.body['scheme-name'],
            'card-who-is': new mongoose.Types.ObjectId(req.body['card-who-is']),
            'card-assessor': new mongoose.Types.ObjectId(req.body['card-assessor']),
            'card-artefact': new mongoose.Types.ObjectId(req.body['card-artefact']),
            'card-format': new mongoose.Types.ObjectId(req.body['card-format']),
            'card-context': new mongoose.Types.ObjectId(req.body['card-context']),
            'card-timing': new mongoose.Types.ObjectId(req.body['card-timing']),
            'card-mission-one': new mongoose.Types.ObjectId(req.body['card-mission-one']),
            'card-mission-two': new mongoose.Types.ObjectId(req.body['card-mission-two']),
            'card-mission-three': new mongoose.Types.ObjectId(req.body['card-mission-three']),
            'creator': new mongoose.Types.ObjectId(req.body['scheme-creator']),
        };

        const scheme = new AssessmentSchemes(schemeData);
        const savedScheme = await scheme.save();
        res.status(201).json({ message: 'Scheme created successfully', scheme: savedScheme });
    } catch (err) {
        res.status(500).json({ error: 'Error creating scheme', details: err.message });
    }
};

// CRUD: Read
const getAllSchemes = async (req, res) => {
    try {
        const schemes = await AssessmentSchemes.find();
        res.status(200).json(schemes);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching schemes', details: err.message });
    }
};

// CRUD: Read
const getSingleScheme = async (req, res) => {
    const _id = req.params.id;
    try {
        const scheme = await AssessmentSchemes.findById(_id);

        if (!scheme) {
            return res.status(404).json({ error: 'Scheme not found' });
        }
        res.status(200).json(scheme);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching scheme', details: err.message });
    }
};

// CRUD: Update
const updateScheme = async (req, res) => {
    const _id = req.params.id;
    try {
        const scheme = await AssessmentSchemes.findByIdAndUpdate(_id, req.body, { new: true });

        if (!scheme) {
            return res.status(404).json({ error: 'Scheme not found' });
        }
        res.status(200).json({ message: 'Scheme updated successfully', scheme });
    } catch (err) {
        res.status(500).json({ error: 'Error updating scheme', details: err.message });
    }
};

// CRUD: Delete
const deleteScheme = async (req, res) => {
    const _id = req.params.id;
    try {
        const scheme = await AssessmentSchemes.findByIdAndDelete(_id);
        if (!scheme) {
            return res.status(404).json({ error: 'Scheme not found' });
        }
        res.status(200).json({ message: 'Scheme deleted successfully', scheme });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting scheme', details: err.message });
    }
};

module.exports = { createScheme, getAllSchemes, getSingleScheme, updateScheme, deleteScheme };