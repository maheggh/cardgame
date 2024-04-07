const mongoose = 	require('mongoose');
const { Schema } = mongoose;
const {isEmail} = require('validator');

const userSchema = new Schema({
	"name": {	
		type: String,
		required: true
	},
	"surname": {
		type: String,
		required: true
	},
	"email": {
		type: String,
		lowercase: true,
		required: true,
		validate:[isEmail, 'please enter your email']
	},
	"password":{
		type: String,
		required:true,
		min:8
	},
	"department": {
		type: String,
		required: true
	},
	"university": {
		type: String,
		required: true
	},
	"position": {
		type: String,
		enum: ['student', 'teacher', 'ta'],
		lowercase: true,
		required: [true, 'position must either be Student, Teacher or TA']
	},
	created:Date,
	updated:Date
});


//compile schema to model
module.exports = User = mongoose.model('user', userSchema);