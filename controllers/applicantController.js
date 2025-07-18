const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all applicants
const getAllApplicants = async (req, res) => {
  try {
    const applicants = await mongodb.getDatabase().db().collection('applicants').find().toArray();
    res.status(200).json(applicants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applicants', error: err });
  }
};

// Get single applicant by ID
const getApplicantById = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid applicant ID format.' });
  }

  try {
    const applicant = await mongodb.getDatabase().db().collection('applicants').findOne({ _id: new ObjectId(id) });
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found.' });
    }
    res.status(200).json(applicant);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applicant', error: err });
  }
};

// Create new applicant
const createApplicant = async (req, res) => {
  const { name, email, appliedDate, resumeLink, jobId } = req.body;

  if (!name || !email || !jobId) {
    return res.status(400).json({ message: 'Name, email, and jobId are required.' });
  }

  const newApplicant = {
    name,
    email,
    resumeLink,
    appliedDate,
    jobId
  };

  try {
    const result = await mongodb.getDatabase().db().collection('applicants').insertOne(newApplicant);
    if (result.acknowledged) {
      res.status(201).json({ message: 'Applicant created.', id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create applicant.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Database error.', error: err });
  }
};

// Update applicant
const updateApplicant = async (req, res) => {
  const id = req.params.id;
  const { name, email, appliedDate, resumeLink, jobId } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid applicant ID format.' });
  }

  const updatedApplicant = {
    name,
    email,
    resumeLink,
    appliedDate,
    jobId
  };

  try {
    const result = await mongodb.getDatabase().db().collection('applicants').replaceOne({ _id: new ObjectId(id) }, updatedApplicant);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Applicant not found or no changes made.' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error updating applicant', error: err });
  }
};

// Delete applicant
const deleteApplicant = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid applicant ID format.' });
  }

  try {
    const result = await mongodb.getDatabase().db().collection('applicants').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Applicant not found.' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting applicant', error: err });
  }
};

module.exports = {
  getAllApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant,
  deleteApplicant
};
