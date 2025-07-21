const express = require('express');
const router = express.Router();
const controller = require('../controllers/authorController');
const validateAuthor = require('../middleware/validateAuthor');

router.get('/', controller.getAll);
router.post('/', validateAuthor, controller.create);

module.exports = router;
