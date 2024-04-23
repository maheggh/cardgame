//User routes go here
const express 		= require('express');
const router 		= express.Router();
const {getAllUsers, getTotalUsers, getSingleUser, updateUser, deleteUser, createUser, authenticateUser, refresh} = require('../controllers/userController');
const {check,validationResult} = require('express-validator');
const {auth, authRole} = require('../helpers/verifyToken');


//GET: Read all users
router.get('/', getAllUsers);

//GET: Read total all users
router.get('/total', getTotalUsers);

//GET: Read single user
router.get('/:id', auth, authRole('Admin'), getSingleUser);

//POST: Create user
router.post('/',[check('email').isEmail(),
check('password').isLength({min:8})], createUser);

//PATCH: Update single user
router.patch('/:id', auth, authRole('Admin'), updateUser);

//DELETE: Delete single user
router.delete('/:id', auth, deleteUser);

//LOGIN
router.post('/login', [check('email').isEmail(),check('password').isLength({min:8})], authenticateUser);

//refresh token
router.post('/token', refresh);

module.exports = router;