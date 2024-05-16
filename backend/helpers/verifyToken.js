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
			console.log("tokenRole: "+tokenRole);
			console.log("role: "+role);
			console.log("token: "+token);
			console.log("no permision");
			res.status(401)
			return res.send('you have no permision')
	}
	next()
	}
}

//code copied and modified from presentation from lefteris 
function authCanUpdate(Model) {
	return async (req,res,next) =>{
		const _id = req.params.id;
	try{
		const scheme = await Model.findById(_id);
            
            if (!scheme) {
                return res.status(404).send('Resource not found');
            }

			if(scheme.creator != req.user.id || req.user.role != 'Admin'){
				res.status(401)
				return res.send('you have no permision to update a the scheme')
			}
			next()
	}catch(error){
		res.json({message:error})
	}
	}
}


module.exports = {auth, authRole, authCanUpdate}