//Card routes go here
const express 		= require('express');
const router 		= express.Router();
const {queryCards} = require('../controllers/searchController');


//GET: Read all cards
router.get('/', queryCards);


module.exports = router;