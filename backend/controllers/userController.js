const Users = require('../schemas/userSchema');

//CRUD: Create
const createUser = async (req, res) => {
	console.log(req.body);
	const user = new Users({
		'name': req.body['surname'],
		'surname': req.body['surname'],
		'email': req.body['email'],
		'department': req.body['department'],
		'university': req.body['university'],
		'position': req.body['position']
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

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser }