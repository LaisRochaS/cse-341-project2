const Author = require('../models/Author');

exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

exports.createAuthor = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      const error = new Error('Name is required.');
      error.statusCode = 400;
      return next(error);
    }

    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      const error = new Error('Name is required.');
      error.statusCode = 400;
      return next(error);
    }

    const updated = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      const error = new Error('Author not found.');
      error.statusCode = 404;
      return next(error);
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const deleted = await Author.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const error = new Error('Author not found.');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ message: 'Author deleted' });
  } catch (err) {
    next(err);
  }
};
