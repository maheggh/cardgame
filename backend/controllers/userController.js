const Users = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

//CRUD: Create
const createUser = async (req, res) => {

	//check if the user already exists: code borrowed from presentation
	const emailExist = await Users.findOne({email:req.body.email})
	if(emailExist){
	return res.status(400).send('email already Exists')
	}

	//encrypt password: code borrowed from presentation
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt)

	const user = new Users({
		'name': req.body['name'],
		'surname': req.body['surname'],
		'email': req.body['email'],
		'password': hashPassword,
		'department': req.body['department'],
		'university': req.body['university'],
		'position': req.body['position'],
		'role': 'User'
	})

	try {
		const a1 = await user.save();
		// if successful, prints success message and the new user
		res.json({ message: 'User created successfully', user: a1 }).status(201); 
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Read
const getAllUsers = async (req, res) => {
	try {
		const user = await Users.find();
		// if successful, prints all users
		res.status(200).json(user);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}
//CRUD: Read
const getTotalUsers = async (req, res) => {
    try {
        const count = await Users.countDocuments();
        // if successful, prints total number of users
        res.status(200).json(count);
    } catch (err) {
        // if unsuccessful, prints error message and sends a 500 status
        res.status(500).send('Error: ' + err);
    }
}

//CRUD: Read
const getSingleUser = async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await Users.findById(_id);

		if (!user) {
			// Send 404 status if the user can't be found
			return res.status(404).json({ error: 'Could not find user. User not found' }); 
		}
		// if successful, prints user and sends 200 status
		res.status(200).json(user); 
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.send('Error: ' + err);
	}
}

//CRUD: Read
const getSingleUserName = async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await Users.findById(_id).select('name surname');

		if (!user) {
			// Send 404 status if the user can't be found
			return res.status(404).json({ error: 'Could not find user. User not found' }); 
		}
		// if successful, prints user and sends 200 status
		res.status(200).json(user); 
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.send('Error: ' + err);
	}
}

//CRUD: Update
const updateUser = async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await Users.findByIdAndUpdate(_id, req.body); //updates user
		const updatedUser = await Users.findById(_id); //returns updated user

		if (!user) {
			//Send 404 status if the updated user can't be found
			return res.status(404).json({ error: 'Could not update user. User not found' }); 
		}
		// if successful, prints updated user and sends 200 status
		res.json({ message: 'User updated successfully', user: updatedUser }).status(200); 
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err); 
	}
}

//CRUD: Delete
const deleteUser = async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await Users.findByIdAndDelete(_id);

		if (!user) {
			//Send 404 status if the user can't be found
			return res.status(404).json({ error: 'Could not delete user. User not found' }); 
		}
		// if successful, prints success message, the deleted user and sends a 200 status
		res.json({ message: 'User deleted successfully', user: user }).status(200); 
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error' + err); 
	}
}

const authenticateUser = async (req, res) => {

	//validate user input: code borrowed from presentation
	const errors = validationResult(req)
	if(!errors.isEmpty()){
	return res.status(400).json({errors:errors.array()})
	}
	//check if email exists: code borrowed from presentation
	const user = await Users.findOne({email:req.body.email})
	if(!user){
	return res.status(400).send('email does not exist')
	}

	//check if password is correct: code borrowed from presentation
	const validPass = await bcrypt.compare(req.body.password, user.password)
	if(!validPass){
	return res.status(400).send('password is wrong')
	}

	//generates token and refresh token then sets token in cookies
	const token = jwt.sign({_id:user._id, role: user.role},process.env.TOKEN_SECRET, { expiresIn: '15m' });
	const refreshToken = jwt.sign({_id:user._id},process.env.REFRESH_SECRET);
	res.cookie('jwt',token,{httpOnly:true}).cookie('refresh',refreshToken,{httpOnly:true}).json({message:"Logged in successfully"});
}

//code borrowed from lefteris
const logoutUser = async (req, res) =>{
	res.clearCookie('jwt').clearCookie('refresh').json({message:'Logged out succesfully'}).status(200)
}

const refresh = async (req, res) => {
	const refreshToken = req.cookies.refresh;
	if (refreshToken == null) return res.sendStatus(401);
	const verified = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
	const user = await Users.findById(verified._id).select('-password');
	if (!user) {
		return res.status(401).send('Access denied');
	}
	const token = jwt.sign({_id:user._id, role: user.role},process.env.TOKEN_SECRET, { expiresIn: '15m' });
	res.cookie('jwt',token,{httpOnly:true}).json({message:"Logged in successfully"});
}

const status = (req, res) => {
	res.json({ isAuthenticated: true, userRole: req.userRole });

}

const getOwnId = (req, res) =>{
	return res.json({_id:req.user._id}).status(200);
}

module.exports = { getAllUsers, getTotalUsers, getSingleUser, createUser, updateUser, deleteUser, authenticateUser, refresh, logoutUser, status, getSingleUserName, getOwnId }