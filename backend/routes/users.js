//User routes go here
const express 		= require('express');
const router 		= express.Router();
const {getAllUsers, getSingleUser, updateUser, deleteUser, createUser, authenticateUser} = require('../controllers/userController');
const {check,validationResult} = require('express-validator');
const auth = require('../helpers/verifyToken');


//GET: Read all users
router.get('/', auth, getAllUsers);

//GET: Read single user
router.get('/:id', auth, getSingleUser);

//POST: Create user
router.post('/',[check('email').isEmail(),
check('password').isLength({min:8})], createUser);

//PATCH: Update single user
router.patch('/:id', updateUser);

//DELETE: Delete single user
router.delete('/:id', deleteUser);

//LOGIN
router.post('/login', [check('email').isEmail(),check('password').isLength({min:8})], authenticateUser);

module.exports = router;