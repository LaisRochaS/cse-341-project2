const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');

router.get('/', applicantController.getAllApplicants);
router.get('/:id', applicantController.getApplicantById);
router.post('/', applicantController.createApplicant);
router.put('/:id', applicantController.updateApplicant);
router.delete('/:id', applicantController.deleteApplicant);

module.exports = router;

