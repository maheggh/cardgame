const mongoose = 	require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
	"card-id": {	
		type: Number,
		required: [true, 'Card is missing card ID'],
		unique:[true, 'ID must be unique']
	},
	"card-type": {
		type: String,
		enum: ['Assessment', 'Mission'],
		required: [true, 'Card type must either be mission or assessment'] 
	},
	"card-name": {
		type: String,
		required: [true, 'Card is missing a name'] 
	},
	"card-description": {
		type: String,
		required: [true, 'Card is missing a description'] 
	},
	"card-details": {
		type: String
	},
	"card-category": {
		type: String
	},
	"card-icon":{
		type: mongoose.Schema.Types.ObjectId
	}
});


//compile schema to model
module.exports = Card = mongoose.model('card', cardSchema);