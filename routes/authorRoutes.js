// routes/authors.js
const express = require('express');
const router = express.Router();
const Author = require('../models/Author'); // Your Author model

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: The authors managing API
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: The created author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name,
        bio: req.body.bio,
        birthDate: req.body.birthDate,
    });

    try {
        const newAuthor = await author.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The updated author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.json(author);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the author
 *         name:
 *           type: string
 *           description: The name of the author
 *         bio:
 *           type: string
 *           description: A short biography of the author
 *         birthDate:
 *           type: string
 *           format: date
 *           description: The birth date of the author
 */

module.exports = router;
