const express = require('express');
const router = express.Router();
const applicantsController = require('../controllers/applicantsController');

router.get('/', applicantsController.getAllApplicants);
router.get('/:id', applicantsController.getApplicantById);
router.post('/', applicantsController.createApplicant);
router.put('/:id', applicantsController.updateApplicant);
router.delete('/:id', applicantsController.deleteApplicant);

module.exports = router;

