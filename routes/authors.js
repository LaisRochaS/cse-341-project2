const express = require('express');
const Author = require('../models/Author');
const passport = require('passport');
const router = express.Router();

// GET all authors
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new author
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name, bio, birthDate, nationality, awards, website, email } = req.body;
    if (!name || !bio || !birthDate || !nationality || !awards || !website || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const author = new Author({ name, bio, birthDate, nationality, awards, website, email });
    try {
        const savedAuthor = await author.save();
        res.status(201).json(savedAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT update an author
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name, bio, birthDate, nationality, awards, website, email } = req.body;
    if (!name || !bio || !birthDate || !nationality || !awards || !website || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, { name, bio, birthDate, nationality, awards, website, email }, { new: true });
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE an author
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await Author.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Protected route example
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ message: 'This is a protected route for authors', user: req.user });
});

module.exports = router;
