const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthYear: { type: Number },
  nationality: { type: String },
  genre: { type: String },
  awards: [String],
  alive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Author', AuthorSchema);
