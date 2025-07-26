const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  year: Number,
  rating: { type: Number, min: 0, max: 5 }
});

module.exports = mongoose.model('Book', BookSchema);


