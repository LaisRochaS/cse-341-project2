const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number },       
  genre: { type: String },                
  pages: { type: Number },               
  price: { type: Number },               
  inStock: { type: Boolean },             
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }
});

module.exports = mongoose.model('Book', bookSchema);


