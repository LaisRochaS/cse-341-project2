   // models/Author.js
   const mongoose = require('mongoose');

   const authorSchema = new mongoose.Schema({
       name: { type: String, required: true },
       bio: { type: String },
       birthDate: { type: Date },
       nationality: { type: String }
   });

   module.exports = mongoose.model('Author', authorSchema);
   