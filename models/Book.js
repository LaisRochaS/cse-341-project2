   // models/Book.js
   const mongoose = require('mongoose');

   const bookSchema = new mongoose.Schema({
       title: { type: String, required: true },
       authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
       publishedDate: { type: Date },
       genre: { type: String },
       pages: { type: Number },
       summary: { type: String },
       isbn: { type: String }
   });

   module.exports = mongoose.model('Book', bookSchema);
   