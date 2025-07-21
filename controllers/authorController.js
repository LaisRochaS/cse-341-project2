const Author = require('../models/authorModel');

exports.getAll = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    next(err);
  }
};
