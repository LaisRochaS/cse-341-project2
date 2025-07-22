const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', bookController.createBook);

module.exports = router;


