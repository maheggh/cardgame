const mongoose = 	require('mongoose');
const { Schema } = mongoose;

const ratingSchema = new Schema({
	"score": {	
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	"creator": {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	"scheme": {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'AssessmentScheme',
		required: true
	}  
});


//compile schema to model
module.exports = Rating = mongoose.model('rating', ratingSchema);	