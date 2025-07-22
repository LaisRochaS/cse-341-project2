module.exports = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error';

  res.status(statusCode).json({ error: message });
};

