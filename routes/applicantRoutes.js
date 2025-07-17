const express = require('express');
const router = express.Router();
const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all applicants
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const applicants = await db.collection('applicants').find().toArray();
    res.status(200).json(applicants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
});

// POST a new applicant
router.post('/', async (req, res) => {
  const applicant = req.body;
  if (!applicant.name || !applicant.email || !applicant.jobId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const db = getDb();
    const result = await db.collection('applicants').insertOne(applicant);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create applicant' });
  }
});

// PUT update applicant
router.put('/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('applicants').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update applicant' });
  }
});

// DELETE applicant
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('applicants').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete applicant' });
  }
});

module.exports = router;
