//User routes go here
const express 		= require('express');
const router 		= express.Router();
const {getAllUsers, getTotalUsers, getSingleUser, updateUser, deleteUser, createUser, authenticateUser, refresh, logoutUser, status} = require('../controllers/userController');
const {check,validationResult} = require('express-validator');
const {auth, authRole} = require('../helpers/verifyToken');


//LOGIN
router.post('/login', [check('email').isEmail(),check('password').isLength({min:8})], authenticateUser);

//LOGOUT
router.get('/logout', logoutUser);

//refresh token
router.post('/token', refresh);

router.get('/status', auth, status);

//GET: Read all users
router.get('/', auth, getAllUsers);

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
router.delete('/:id', auth, authRole, deleteUser);



module.exports = router;