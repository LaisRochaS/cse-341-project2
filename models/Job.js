const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: {String},
  salaryRange: {String},
  description: {String},
  postedDate: { type: Date, default: Date.now },
  employmentType: {String},
  requirements: [String]
});

module.exports = mongoose.model('Job', jobSchema);
