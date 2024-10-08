//Assessment scheme routes go here
const express 		= require('express');
const router 		= express.Router();
const {createScheme, getAllSchemes, getSingleScheme, updateScheme, deleteScheme, getTopRatedSchemes} = require('../controllers/assessmentSchemeController');
const {auth, authRole, authCanUpdate} = require('../helpers/verifyToken');
const AssessmentSchemes = require('../schemas/assessmentSchemeSchema');

//GET: Read all schemes
router.get('/top', getTopRatedSchemes);

//GET: Read all schemes
router.get('/', getAllSchemes);

//GET: Read single scheme
router.get('/:id', auth, getSingleScheme);

//POST: Create scheme
router.post('/', auth, createScheme);

//PATCH: Update single scheme
router.patch('/:id', auth, authCanUpdate(AssessmentSchemes), updateScheme);

//DELETE: Delete single scheme
router.delete('/:id', auth, authCanUpdate(AssessmentSchemes), deleteScheme);

module.exports = router;