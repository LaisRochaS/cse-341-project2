const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

exports.getAllJobs = async (req, res) => {
  try {
    const db = getDb();
    const jobs = await db.collection('jobs').find().toArray();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const db = getDb();
    const job = await db.collection('jobs').findOne({ _id: new ObjectId(req.params.id) });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('jobs').insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create job' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('jobs').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('jobs').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
};
