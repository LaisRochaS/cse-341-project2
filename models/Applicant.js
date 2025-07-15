const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeLink: {String} ,
  appliedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Applicant', applicantSchema);
