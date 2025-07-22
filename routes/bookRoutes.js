const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET all books
router.get('/', bookController.getAllBooks);

// POST create a new book
router.post('/', bookController.createBook);

// PUT update a book by ID
router.put('/:id', bookController.updateBook);

// DELETE delete a book by ID
router.delete('/:id', bookController.deleteBook);

module.exports = router;

