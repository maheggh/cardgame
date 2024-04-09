const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  'card-id': { type: Number, required: true, unique: true },
  'card-category': String,
  'card-name': { type: String, required: true },
  'card-description': { type: String, required: true },
  'card-details': String 
}, { strict: false });
module.exports = mongoose.model('Card', cardSchema);
