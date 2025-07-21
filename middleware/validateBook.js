const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string(),
  publishedYear: Joi.number(),
  pages: Joi.number(),
  price: Joi.number(),
  inStock: Joi.boolean(),
  authorId: Joi.string().required()
});

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
