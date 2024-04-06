//User routes go here
const express 		= require('express');
const router 		= express.Router();
const {getAllUsers, getSingleUser, updateUser, deleteUser, createUser} = require('../controllers/userController');

//GET: Read all users
router.get('/', getAllUsers);

//GET: Read single user
router.get('/:id', getSingleUser);

//POST: Create user
router.post('/', createUser);

//PATCH: Update single user
router.patch('/:id', updateUser);

//DELETE: Delete single user
router.delete('/:id', deleteUser);

module.exports = router;