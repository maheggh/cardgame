const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

router.get('/', assessmentController.getAllAssessments);
router.get('/search', assessmentController.search);

module.exports = router;