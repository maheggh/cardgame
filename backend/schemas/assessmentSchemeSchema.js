const mongoose = 	require('mongoose');
const { Schema } = mongoose;

const AssessmentSchemeSchema = new Schema({
	"scheme-name": {	
		type: String,
		required: true,
		default: 'New Schema'
	},
	"card-who-is":{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"card-assessor":{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"card-artefact":{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"card-format":{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"card-context":{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"card-timing":{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"card-mission-one":{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"card-mission-two":{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"card-mission-three":{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"creator": {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	} 
});


//compile schema to model
module.exports = AssessmentScheme = mongoose.model('AssessmentScheme', AssessmentSchemeSchema);	