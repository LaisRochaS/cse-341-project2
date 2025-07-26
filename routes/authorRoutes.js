const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// GET all authors
router.get('/', async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// GET one author by ID
router.get('/:id', async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
});

// POST new author
router.post('/', async (req, res, next) => {
  try {
    const { name, birthYear, nationality, genre, awards, alive } = req.body;

    // Validation
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const newAuthor = new Author({
      name,
      birthYear,
      nationality,
      genre,
      awards,
      alive
    });

    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    next(error);
  }
});

// PUT update author
router.put('/:id', async (req, res, next) => {
  try {
    const { name, birthYear, nationality, genre, awards, alive } = req.body;

    // Validation
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { name, birthYear, nationality, genre, awards, alive },
      { new: true, runValidators: true }
    );

    if (!updatedAuthor) return res.status(404).json({ message: 'Author not found' });

    res.status(200).json(updatedAuthor);
  } catch (error) {
    next(error);
  }
});

// DELETE author
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
