const Joi = require('joi');

const applicantSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  resumeLink: Joi.string().uri().optional(),
  jobId: Joi.string().required()
});

module.exports = (req, res, next) => {
  const { error } = applicantSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
