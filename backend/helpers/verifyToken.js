//code mostly copied from presentation from lefteris
const jwt = require('jsonwebtoken');
const Users = require('../schemas/userSchema');

const auth = async (req, res, next) => {
	const authtoken = req.header('auth-token')
	if (!authtoken || !authtoken.startsWith('Bearer')) {
		return res.status(401).send('Access denied')
	}
	try {
		token = authtoken.split(' ')[1]
		const verified = jwt.verify(token, process.env.TOKEN_SECRET)
		req.user = await Users.findById(verified._id).select('-password') 
		next()
	} catch (error) {
		res.status(400).send('invalid token')
	}
}

//code copied from presentation from lefteris
function authRole(role) {
	return (req,res,next) =>{
		if (req.user.role !== role){
			res.status(401)
			return res.send('you have no permision')
	}
	next()
	}
}

module.exports = {auth, authRole}