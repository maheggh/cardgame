const express = require('express');
const router = express.Router();
const Card = require('../schemas/cardSchema'); // Make sure this path is correct
const { BulkUpload } = require('../controllers/uploadController');
const { auth } = require('../helpers/verifyToken');



router.post('/', BulkUpload);

module.exports = router;
