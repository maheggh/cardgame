//Icon routes go here
const express = require('express');
const router = express.Router();
const { createRating, getAllRatings, getSingleRating, updateRating, deleteRating, calculateAverageRating, findUserRating } = require('../controllers/ratingController');
const { auth, authCanUpdate } = require('../helpers/verifyToken');
const ratingSchema = require('../schemas/ratingSchema');

// POST: Create rating
router.post('/', auth, createRating);

// GET: Read all ratings
router.get('/', getAllRatings);

// GET: Check for user rating
router.get('/rated/:id', auth, findUserRating);

// GET: Read single rating
router.get('/:id', auth, getSingleRating);

// GET: Read avg rating for scheme
router.get('/avg/:id', auth, calculateAverageRating);

// PATCH: Update single rating
router.patch('/:id', auth, authCanUpdate(ratingSchema), updateRating);

// DELETE: Delete single rating
router.delete('/:id', auth, deleteRating);

module.exports = router;

