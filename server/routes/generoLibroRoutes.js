const express = require('express');
const router = express.Router();
const generoLibroController = require('../controllers/generoLibroController');

/**
 * @swagger
 * /api/genero-libros:
 *   post:
 *     summary: Crear una nueva relación entre libro y género
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Libro:
 *                 type: string
 *               ID_Genero:
 *                 type: string
 *             required:
 *               - ID_Libro
 *               - ID_Genero
 *     responses:
 *       201:
 *         description: Relación creada correctamente
 */
router.post('/genero-libros', generoLibroController.createGeneroLibro);

/**
 * @swagger
 * /api/genero-libros:
 *   get:
 *     summary: Obtener todas las relaciones entre libros y géneros
 *     responses:
 *       200:
 *         description: Lista de relaciones
 */
router.get('/genero-libros', generoLibroController.getGeneroLibros);

/**
 * @swagger
 * /api/genero-libros/{id}:
 *   get:
 *     summary: Obtener una relación entre libro y género por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Relación encontrada
 */
router.get('/genero-libros/:id', generoLibroController.getGeneroLibroById);

/**
 * @swagger
 * /api/genero-libros/{id}:
 *   delete:
 *     summary: Eliminar una relación entre libro y género por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Relación eliminada correctamente
 */
router.delete('/genero-libros/:id', generoLibroController.deleteGeneroLibro);

module.exports = router;
