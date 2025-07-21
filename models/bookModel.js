const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: String,
  publishedYear: Number,
  pages: Number,
  price: Number,
  inStock: Boolean,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }
});

module.exports = mongoose.model('Book', bookSchema);
