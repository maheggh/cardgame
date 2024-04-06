//Icon routes go here
const express 		= require('express');
const router 		= express.Router();
const {createIcon, getAllIcons, getSingleIcon,  updateIcon, deleteIcon } = require('../controllers/iconController');

//POST: Create card
router.post('/', createIcon);

//GET: Read all cards
router.get('/', getAllIcons);

//GET: Read single card
router.get('/:id', getSingleIcon);

//PATCH: Update single card
router.patch('/:id', updateIcon);

//DELETE: Delete single card
router.delete('/:id', deleteIcon);

module.exports = router;