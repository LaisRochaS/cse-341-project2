const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');
const validateBook = require('../middleware/validateBook');

router.get('/', controller.getAll);
router.post('/', validateBook, controller.create);
router.put('/:id', validateBook, controller.update);
router.delete('/:id', controller.remove);

module.exports = router; 

