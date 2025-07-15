const Joi = require('joi');

const jobSchema = Joi.object({
  title: Joi.string().required(),
  company: Joi.string().required(),
  location: Joi.string().optional(),
  salaryRange: Joi.string().optional(),
  description: Joi.string().optional(),
  employmentType: Joi.string().optional(),
  requirements: Joi.array().items(Joi.string()).optional()
});

module.exports = (req, res, next) => {
  const { error } = jobSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
