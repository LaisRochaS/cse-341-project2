const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// GET all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// POST a new book
router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) book
router.put('/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE book
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
