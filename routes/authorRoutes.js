const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     responses:
 *       200:
 *         description: List of authors
 */
router.get('/', authorController.getAllAuthors);

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *               nationality:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created
 */
router.post('/', authorController.createAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *               nationality:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated
 */
router.put('/:id', authorController.updateAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted
 */
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
