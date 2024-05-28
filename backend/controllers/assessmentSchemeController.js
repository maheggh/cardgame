const mongoose = require('mongoose');
const AssessmentSchemes = require('../schemas/assessmentSchemeSchema');
const Ratings = require('../schemas/ratingSchema');

// CRUD: Create
const createScheme = async (req, res) => {
    const scheme = new AssessmentSchemes({
        'scheme-name': req.body['scheme-name'],
        'card-who-is': req.body['card-who-is'],
        'card-assessor': req.body['card-assessor'],
        'card-artefact': req.body['card-artefact'],
        'card-format': req.body['card-format'],
        'card-context': req.body['card-context'],
        'card-timing': req.body['card-timing'],
        'card-mission-one': req.body['card-mission-one'],
        'card-mission-two': req.body['card-mission-two'],
        'card-mission-three': req.body['card-mission-three'],
        'creator': req.user._id
    })

    try {
        const a1 = await scheme.save();
        // if successful, prints success message and the new scheme
        res.json({ message: 'Scheme created successfully', scheme: a1 }).status(201);
    } catch (err) {
        // if unsuccessful, prints error message and sends a 500 status
        res.status(500).send('Error: ' + err);
    }
}

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

const getTopRatedSchemes = async (req, res) => {
    const _id = req.params.id;
    try {
        const topRatedSchemes = await AssessmentSchemes.aggregate([
          {
            $lookup: {
              from: 'ratings', // The name of the collection, not the model
              localField: '_id',
              foreignField: 'scheme',
              as: 'ratings'
            }
          },
          {
            $unwind: '$ratings'
          },
          {
            $group: {
              _id: '$_id',
              scheme: { $first: '$$ROOT' },
              averageRating: { $avg: '$ratings.score' }
            }
          },
          {
            $sort: { averageRating: -1 }
          },
          {
            $limit: 3
          }
        ]);
        if (!topRatedSchemes) {
            return res.status(404).json({ error: 'Top schemes not found' });
        }
        res.status(200).json(topRatedSchemes);
    } catch (err) {
        res.status(500).json({ error: 'Could not get top schemes', details: err.message });
    }
};

module.exports = { createScheme, getAllSchemes, getSingleScheme, updateScheme, deleteScheme, getTopRatedSchemes };
