//Assessment scheme routes go here
const express 		= require('express');
const router 		= express.Router();
const {createScheme, getAllSchemes, getSingleScheme, updateScheme, deleteScheme} = require('../controllers/assessmentSchemeController');
const {auth, authRole, authCanUpdate} = require('../helpers/verifyToken');

//GET: Read all schemes
router.get('/', auth, getAllSchemes);

//GET: Read single scheme
router.get('/:id', auth, getSingleScheme);

//POST: Create scheme
router.post('/', auth, createScheme);

//PATCH: Update single scheme
router.patch('/:id', auth, authCanUpdate, updateScheme);

//DELETE: Delete single scheme
router.delete('/:id', auth, deleteScheme);

module.exports = router;