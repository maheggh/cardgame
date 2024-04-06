const mongoose 		= require('mongoose');

const connectDB = async () => {
	try {
	mongoose.connect(process.env.MONGO_URI);
	console.log("Successfully connected to database!");
	}
	catch(error){
		console.log(error);
	}
}

module.exports = connectDB;