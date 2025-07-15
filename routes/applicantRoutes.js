const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');
const validate = require('../validation/applicantValidation');

router.get('/', applicantController.getApplicants);
router.post('/', validate, applicantController.createApplicant);
router.delete('/:id', applicantController.deleteApplicant);

module.exports = router;
