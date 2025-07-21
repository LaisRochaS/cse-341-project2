const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string(),
  birthdate: Joi.date()
});

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
