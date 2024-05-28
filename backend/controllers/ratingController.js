const Ratings = require('../schemas/ratingSchema');
const mongoose = require('mongoose');

// Create a new rating
const createRating = async (req, res) => {
    console.log('Creating rating', req.body); // Log request body

    // Initialize a new Rating object with request data
    const rating = new Ratings({
        'creator': req.user._id,
        'score': req.body['score'],
        'scheme': req.body['scheme']
    });

    try {
        // Save the new rating to the database
        const a1 = await rating.save();
        // Respond with success message and saved rating
        res.status(201).json({ message: 'Rating created successfully', Rating: a1 });
    } catch (err) {
        // Handle and respond with error
        res.status(500).send('Error: ' + err);
    }
};

// Retrieve all ratings
const getAllRatings = async (req, res) => {
    try {
        // Find all ratings in the database
        const ratings = await Ratings.find();
        // Respond with the retrieved ratings
        res.status(200).json(ratings);
    } catch (err) {
        // Handle and respond with error
        res.status(500).send('Error: ' + err);
    }
};

// Retrieve a single rating by ID
const getSingleRating = async (req, res) => {
    const _id = req.params.id;
    try {
        // Find rating by ID
        const rating = await Ratings.findById(_id);

        // If rating not found, respond with 404 status
        if (!rating) {
            return res.status(404).json({ error: 'Could not find rating. Rating not found' });
        }
        // Respond with the found rating
        res.json(rating);
    } catch (err) {
        // Handle and respond with error
        res.status(500).send('Error: ' + err);
    }
};

// Update a rating by ID
const updateRating = async (req, res) => {
    const _id = req.params.id;
    try {
        // Find and update rating by ID
        const rating = await Ratings.findByIdAndUpdate(_id, req.body);
        // Retrieve the updated rating
        const updatedRating = await Ratings.findById(_id);

        // If rating not found, respond with 404 status
        if (!rating) {
            return res.status(404).json({ error: 'Could not update rating. Rating not found' });
        }
        // Respond with success message and updated rating
        res.status(200).json({ message: 'Rating updated successfully', Rating: updatedRating });
    } catch (err) {
        // Handle and respond with error
        res.status(500).send('Error: ' + err);
    }
};

// Delete a rating by ID
const deleteRating = async (req, res) => {
    const _id = req.params.id;
    try {
        // Find and delete rating by ID
        const rating = await Ratings.findByIdAndDelete(_id);

        // If rating not found, respond with 404 status
        if (!rating) {
            return res.status(404).json({ error: 'Could not delete rating. Rating not found' });
        }
        // Respond with success message and deleted rating
        res.status(200).json({ message: 'Rating deleted successfully', Rating: rating });
    } catch (err) {
        // Handle and respond with error
        res.status(500).send('Error: ' + err);
    }
};

// Calculate average rating for a scheme
const calculateAverageRating = async (req, res) => {
    const _id = req.params.id;
    try {
        // Convert scheme ID to MongoDB ObjectId
        const schemeObjectId = new mongoose.Types.ObjectId(_id);

        // Aggregate to calculate the average rating for the scheme
        const result = await Ratings.aggregate([
            { $match: { scheme: schemeObjectId } },
            {
                $group: {
                    _id: '$scheme',
                    averageRating: { $avg: '$score' }
                }
            }
        ]);

        // If no ratings found, respond with 204 status
        if (result.length === 0) {
            return res.status(204).json({ error: 'No ratings found for this scheme' });
        }

        // Respond with the average rating
        res.status(200).json({ _id, averageRating: result[0].averageRating });
    } catch (error) {
        // Handle and respond with error
        res.status(500).send('Error: ' + error);
    }
};

// Find a user's rating for a specific scheme
const findUserRating = async (req, res) => {
    const _id = req.params.id;
    try {
        // Find rating by creator and scheme ID
        const rating = await Ratings.findOne({ creator: req.user._id, scheme: _id });

        // If rating not found, respond with 204 status
        if (!rating) {
            return res.status(204).json({ error: 'Could not find rating. Rating not found' });
        }
        // Respond with the found rating
        res.status(200).json(rating);
    } catch (err) {
        // Handle and respond with error
        res.status(500).send('Error: ' + err);
    }
};

module.exports = { createRating, getAllRatings, getSingleRating, updateRating, deleteRating, calculateAverageRating, findUserRating };
