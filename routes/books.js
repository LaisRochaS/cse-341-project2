const express = require('express');
const Book = require('../models/Book');
const passport = require('passport');
const router = express.Router();

// GET all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('authorId');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new book
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, authorId, publishedDate, genre, pages, language, isbn } = req.body;
    if (!title || !authorId || !publishedDate || !genre || !pages || !language || !isbn) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const book = new Book({ title, authorId, publishedDate, genre, pages, language, isbn });
    try {
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT update a book
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, authorId, publishedDate, genre, pages, language, isbn } = req.body;
    if (!title || !authorId || !publishedDate || !genre || !pages || !language || !isbn) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, authorId, publishedDate, genre, pages, language, isbn }, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a book
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Protected route example
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ message: 'This is a protected route for books', user: req.user });
});

module.exports = router;
