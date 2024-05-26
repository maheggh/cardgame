const mongoose = 	require('mongoose');
const { Schema } = mongoose;

const bookmarkSchema = new Schema({
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
module.exports = Bookmark = mongoose.model('bookmark', bookmarkSchema);	