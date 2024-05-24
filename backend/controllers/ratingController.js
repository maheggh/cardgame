const Ratings = require('../schemas/ratingSchema');
const mongoose = require('mongoose');

const createRating = async (req, res) => {
    console.log('Creating rating', req.body); // Log request body
    const rating = new Ratings({
        'creator': req.user._id,
        'score': req.body['score'],
        'scheme': req.body['scheme']
    });

    try {
        const a1 = await rating.save();
        res.status(201).json({ message: 'Rating created successfully', Rating: a1 });
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

const getAllRatings = async (req, res) => {
    try {
        const ratings = await Ratings.find();
        res.status(200).json(ratings);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

const getSingleRating = async (req, res) => {
    const _id = req.params.id;
    try {
        const rating = await Ratings.findById(_id);

        if (!rating) {
            return res.status(404).json({ error: 'Could not find rating. Rating not found' });
        }
        res.json(rating);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

const updateRating = async (req, res) => {
    const _id = req.params.id;
    try {
        const rating = await Ratings.findByIdAndUpdate(_id, req.body);
        const updatedRating = await Ratings.findById(_id);

        if (!rating) {
            return res.status(404).json({ error: 'Could not update rating. rating not found' });
        }
        res.status(200).json({ message: 'Rating updated successfully', Rating: updatedRating });
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

const deleteRating = async (req, res) => {
    const _id = req.params.id;
    try {
        const rating = await Ratings.findByIdAndDelete(_id);
        if (!rating) {
            return res.status(404).json({ error: 'Could not delete rating. Rating not found' });
        }
        res.status(200).json({ message: 'Rating deleted successfully', Rating: rating });
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

const calculateAverageRating = async (req, res) => {
    const _id = req.params.id;
    try {
        const schemeObjectId = new mongoose.Types.ObjectId(_id);

        const result = await Ratings.aggregate([
            { $match: { scheme: schemeObjectId } },
            {
                $group: {
                    _id: '$scheme',
                    averageRating: { $avg: '$score' }
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(204).json({ error: 'No ratings found for this scheme' });
        }

        res.status(200).json({ _id, averageRating: result[0].averageRating });
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
};

const findUserRating = async (req, res) => {
    const _id = req.params.id;
    try {
        const rating = await Ratings.findOne({ creator: req.user._id, scheme: _id });
        if (!rating) {
            return res.status(204).json({ error: 'Could not find rating. Rating not found' });
        }
        res.status(200).json(rating);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

module.exports = { createRating, getAllRatings, getSingleRating, updateRating, deleteRating, calculateAverageRating, findUserRating };
