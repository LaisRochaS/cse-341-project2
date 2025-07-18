const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

// GET all applicants
exports.getAllApplicants = async (req, res) => {
  try {
    const db = getDb();
    const applicants = await db.collection('applicants').find().toArray();
    res.status(200).json(applicants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
};

// GET a single applicant by ID
exports.getApplicantById = async (req, res) => {
  try {
    const db = getDb();
    const applicant = await db.collection('applicants').findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    res.status(200).json(applicant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applicant' });
  }
};

// POST a new applicant
exports.createApplicant = async (req, res) => {
  const { name, email, resumeLink } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' });
  }

  try {
    const db = getDb();
    const result = await db.collection('applicants').insertOne({ name, email, resumeLink });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create applicant' });
  }
};

// PUT update applicant
exports.updateApplicant = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('applicants').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update applicant' });
  }
};

// DELETE an applicant
exports.deleteApplicant = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('applicants').deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    res.status(200).json({ message: 'Applicant deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete applicant' });
  }
};
