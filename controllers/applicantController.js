const Applicant = require('../models/Applicant');

exports.getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find().populate('jobId');
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createApplicant = async (req, res) => {
  try {
    const applicant = new Applicant(req.body);
    await applicant.save();
    res.status(201).json(applicant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    if (!applicant) return res.status(404).json({ error: 'Applicant not found' });
    res.json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
