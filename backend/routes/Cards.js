//Card routes go here
const express 		= require('express');
const router 		= express.Router();
const {createCard, getAllCards, getSingleCard, deleteCard, updateCard} = require('../controllers/cardController');
const {auth, authRole} = require('../helpers/verifyToken');

//GET: Read all cards
router.get('/', getAllCards);

//GET: Read single card
router.get('/:id', getSingleCard);

//POST: Create card
router.post('/', auth, createCard);

//PATCH: Update single card
router.patch('/:id', auth, updateCard);

//DELETE: Delete single card
router.delete('/:id', auth, deleteCard);

module.exports = router;