//Icon routes go here
const express 		= require('express');
const router 		= express.Router();
const {createRating, getAllRatings, getSingleRating,  updateRating, deleteRating } = require('../controllers/ratingController');

//POST: Create card
router.post('/', createRating);

//GET: Read all cards
router.get('/', getAllRatings);

//GET: Read single card
router.get('/:id', getSingleRating);

//PATCH: Update single card
router.patch('/:id', updateRating);

//DELETE: Delete single card
router.delete('/:id', deleteRating);

module.exports = router;