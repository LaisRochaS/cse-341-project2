// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    thumbnail: { type: String },
});

module.exports = mongoose.model('User ', userSchema);
