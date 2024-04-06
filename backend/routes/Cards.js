//Card routes go here
const express 		= require('express');
const router 		= express.Router();
const {createCard, getAllCards, getSingleCard, deleteCard, updateCard} = require('../controllers/cardController');

//GET: Read all cards
router.get('/', getAllCards);

//GET: Read single card
router.get('/:id', getSingleCard);

//POST: Create card
router.post('/', createCard);

//PATCH: Update single card
router.patch('/:id', updateCard);

//DELETE: Delete single card
router.delete('/:id', deleteCard);

module.exports = router;