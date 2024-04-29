//Assessment scheme routes go here
const express 		= require('express');
const router 		= express.Router();
const {createScheme, getAllSchemes, getSingleScheme, updateScheme, deleteScheme} = require('../controllers/assessmentSchemeController');
const {auth, authRole} = require('../helpers/verifyToken');

//GET: Read all schemes
router.get('/', getAllSchemes);

//GET: Read single scheme
router.get('/:id', getSingleScheme);

//POST: Create scheme
router.post('/', createScheme);

//PATCH: Update single scheme
router.patch('/:id', auth, updateScheme);

//DELETE: Delete single scheme
router.delete('/:id', auth, deleteScheme);

module.exports = router;