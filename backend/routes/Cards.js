//Card routes go here
const express 		= require('express');
const router 		= express.Router();
const {createCard, getAllCards, getSingleCard, deleteCard, updateCard, getTotalCards, getTotalCardTypes } = require('../controllers/cardController');
const {auth, authRole} = require('../helpers/verifyToken');

//GET: Read all cards
router.get('/', getAllCards);

//GET: total cards
router.get('/total',getTotalCards);

//GET: total card types
router.get('/types',getTotalCardTypes);

//GET: Read single card
router.get('/:id', getSingleCard);

//POST: Create card
router.post('/', auth, authRole('Admin'), createCard);

//PATCH: Update single card
router.patch('/:id', auth, authRole('Admin'), updateCard);

//DELETE: Delete single card
router.delete('/:id', auth, authRole('Admin'), deleteCard);

module.exports = router;