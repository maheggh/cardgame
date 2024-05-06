//code mostly copied from presentation from lefteris
const jwt = require('jsonwebtoken');
const Users = require('../schemas/userSchema');

const auth = async (req, res, next) => {
	const authtoken = req.cookies.jwt;
	if (!authtoken) {
		return res.status(401).send('Access denied')
	}
	try {
		token = authtoken.split(' ')[1]
		const verified = jwt.verify(authtoken, process.env.TOKEN_SECRET)
		const user = await Users.findById(verified._id).select('-password') 
		req.user = user
		req.userRole = user.role
		next()
	} catch (error) {
		res.clearCookie('jwt');
		res.status(400).send('invalid token')
	}
}

//code copied from presentation from lefteris
function authRole(role) {
	return (req,res,next) =>{
		const token = req.cookies.jwt
		const tokenRole = JSON.parse(atob(token.split('.')[1])).role
		if (tokenRole !== role){
			console.log("no permision");
			res.status(401)
			return res.send('you have no permision')
	}
	next()
	}
}

module.exports = {auth, authRole}