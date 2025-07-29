 const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
       name: { type: String, required: true },
       bio: { type: String, required: true },
       birthDate: { type: Date, required: true },
       nationality: { type: String, required: true },
       awards: { type: [String], required: true },
       website: { type: String, required: true },
       email: { type: String, required: true }
});

module.exports = mongoose.model('Author', authorSchema);
   