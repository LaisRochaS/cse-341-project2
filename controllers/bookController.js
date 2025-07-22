const Book = require('../models/Book');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      const error = new Error('Title and Author are required.');
      error.statusCode = 400;
      return next(error);
    }

    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      const error = new Error('Title and Author are required.');
      error.statusCode = 400;
      return next(error);
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      const error = new Error('Book not found.');
      error.statusCode = 404;
      return next(error);
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const error = new Error('Book not found.');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};
