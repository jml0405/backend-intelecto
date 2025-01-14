const express = require('express');
const router = express.Router();
const generoController = require('../controllers/genreController');

/**
 * @swagger
 * /api/generos:
 *   get:
 *     summary: Obtener todos los géneros
 *     description: Devuelve una lista de todos los géneros registrados.
 *     responses:
 *       200:
 *         description: Lista de géneros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nombre:
 *                     type: string
 */
router.get('/generos', generoController.getGeneros); // Obtener todos los géneros

/**
 * @swagger
 * /api/generos:
 *   post:
 *     summary: Crear un nuevo género
 *     description: Crea un nuevo género en la base de datos con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *             required:
 *               - nombre
 *     responses:
 *       201:
 *         description: Género creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 generoId:
 *                   type: string
 */
router.post('/generos', generoController.createGenero); // Crear un nuevo género

/**
 * @swagger
 * /api/generos/{id}:
 *   get:
 *     summary: Obtener un género por ID
 *     description: Obtiene los datos de un género específico a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Género encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nombre:
 *                   type: string
 */
router.get('/generos/:id', generoController.getGeneroById); // Obtener un género por ID

/**
 * @swagger
 * /api/generos/{id}:
 *   put:
 *     summary: Actualizar un género por ID
 *     description: Actualiza los datos de un género existente a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
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
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Género actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/generos/:id', generoController.updateGenero); // Actualizar un género por ID

/**
 * @swagger
 * /api/generos/{id}:
 *   delete:
 *     summary: Eliminar un género por ID
 *     description: Elimina un género específico a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Género eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/generos/:id', generoController.deleteGenero); // Eliminar un género por ID

module.exports = router;
