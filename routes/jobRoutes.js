const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const validate = require('../validation/jobValidation');

router.get('/', jobController.getJobs);
router.post('/', validate, jobController.createJob);
router.put('/:id', validate, jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
