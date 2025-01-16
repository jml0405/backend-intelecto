const express = require('express');
const router = express.Router();
const estadoLibroController = require('../controllers/estadoLibroController');

/**
 * @swagger
 * /api/estado-libros:
 *   get:
 *     summary: Obtener todos los estados de libro
 *     description: Devuelve una lista de todos los estados registrados.
 *     responses:
 *       200:
 *         description: Lista de estados de libro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   estado:
 *                     type: string
 */
router.get('/estado-libros', estadoLibroController.getEstadosLibros); // Obtener todos los estados de libro

/**
 * @swagger
 * /api/estado-libros:
 *   post:
 *     summary: Crear un nuevo estado de libro
 *     description: Crea un nuevo estado de libro en la base de datos con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *             required:
 *               - estado
 *     responses:
 *       201:
 *         description: Estado de libro creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 estadoId:
 *                   type: string
 */
router.post('/estado-libros', estadoLibroController.createEstadoLibro); // Crear un nuevo estado de libro

/**
 * @swagger
 * /api/estado-libros/{id}:
 *   get:
 *     summary: Obtener un estado de libro por ID
 *     description: Obtiene los datos de un estado de libro específico a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado de libro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 estado:
 *                   type: string
 */
router.get('/estado-libros/:id', estadoLibroController.getEstadoLibroById); // Obtener un estado de libro por ID

/**
 * @swagger
 * /api/estado-libros/{id}:
 *   put:
 *     summary: Actualizar un estado de libro por ID
 *     description: Actualiza los datos de un estado de libro existente a partir de su ID.
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
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estado de libro actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/estado-libros/:id', estadoLibroController.updateEstadoLibro); // Actualizar un estado de libro por ID

/**
 * @swagger
 * /api/estado-libros/{id}:
 *   delete:
 *     summary: Eliminar un estado de libro por ID
 *     description: Elimina un estado de libro específico a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado de libro eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/estado-libros/:id', estadoLibroController.deleteEstadoLibro); // Eliminar un estado de libro por ID

module.exports = router;
