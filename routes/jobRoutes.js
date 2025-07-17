const express = require('express');
const router = express.Router();
const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const jobs = await db.collection('jobs').find().toArray();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// POST a new job
router.post('/', async (req, res) => {
  const job = req.body;
  if (!job.title || !job.company) {
    return res.status(400).json({ error: 'Missing title or company' });
  }

  try {
    const db = getDb();
    const result = await db.collection('jobs').insertOne(job);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// PUT update job
router.put('/:id', async (req, res) => {
  const db = getDb();
  try {
    const updatedJob = await db.collection('jobs').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// DELETE job
router.delete('/:id', async (req, res) => {
  const db = getDb();
  try {
    const result = await db.collection('jobs').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

module.exports = router;
