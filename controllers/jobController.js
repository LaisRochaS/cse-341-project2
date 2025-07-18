const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await mongodb.getDatabase().db().collection('jobs').find().toArray();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err });
  }
};

// Get a single job by ID
const getJobById = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid job ID format.' });
  }

  try {
    const job = await mongodb.getDatabase().db().collection('jobs').findOne({ _id: new ObjectId(id) });
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching job', error: err });
  }
};

// Create a new job
const createJob = async (req, res) => {
  const { title, description, company, location, salaryRange, postedDate } = req.body;

  if (!title || !company || !location) {
    return res.status(400).json({ message: 'Title, company, and location are required.' });
  }

  const newJob = {
    title,
    description,
    company,
    location,
    salaryRange,
    postedDate: postedDate || new Date()
  };

  try {
    const result = await mongodb.getDatabase().db().collection('jobs').insertOne(newJob);
    if (result.acknowledged) {
      res.status(201).json({ message: 'Job created.', id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create job.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Database error.', error: err });
  }
};

// Update an existing job
const updateJob = async (req, res) => {
  const id = req.params.id;
  const { title, description, company, location, salaryRange, postedDate } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid job ID format.' });
  }

  const updatedJob = {
    title,
    description,
    company,
    location,
    salaryRange,
    postedDate
  };

  try {
    const result = await mongodb.getDatabase().db().collection('jobs').replaceOne({ _id: new ObjectId(id) }, updatedJob);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Job not found or no changes made.' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error updating job', error: err });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid job ID format.' });
  }

  try {
    const result = await mongodb.getDatabase().db().collection('jobs').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting job', error: err });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};
