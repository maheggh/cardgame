const mongoose = 	require('mongoose');
const { Schema } = mongoose;

const iconSchema = new Schema({
	"iconURL": {
		type: String,
		required: [true, 'icon URL is required'] 
	}
});


//compile schema to model
module.exports = Icon = mongoose.model('icon', iconSchema);