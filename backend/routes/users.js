//User routes go here
const express 		= require('express');
const router 		= express.Router();
const {getAllUsers, getTotalUsers, getSingleUser, updateUser, deleteUser, createUser, authenticateUser, refresh, logoutUser, status, getSingleUserName, getOwnId } = require('../controllers/userController');
const {check,validationResult} = require('express-validator');
const {auth, authRole, authCanUpdate, userCanUpdate} = require('../helpers/verifyToken');

//LOGIN
router.post('/login', [check('email').isEmail(),check('password').isLength({min:8})], authenticateUser);

//LOGOUT
router.get('/logout', logoutUser);

//refresh token
router.get('/token', refresh);

//status check. checks if users are still auth
router.get('/status', auth, status);

//status check. checks if users are still auth
router.get('/account', auth, getOwnId);

//GET: Read all users
router.get('/', auth, authRole('Admin'), getAllUsers);

//GET: Read total all users
router.get('/total', getTotalUsers);

//POST: Create user
router.post('/signup',[check('email').isEmail(),
check('password').isLength({min:8})], createUser);

//GET: Read single user
router.get('/:id', auth, userCanUpdate, getSingleUser);

//GET: get single users name
router.get('/name/:id', auth, getSingleUserName);

//PATCH: Update single user
router.patch('/:id', auth, userCanUpdate, updateUser);

//DELETE: Delete single user
router.delete('/:id', auth, authRole('Admin'), deleteUser);



module.exports = router;