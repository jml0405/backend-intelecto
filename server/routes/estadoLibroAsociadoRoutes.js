const express = require('express');
const router = express.Router();
const estadoLibroAsociadoController = require('../controllers/estadoLibroAsociadoController');

/**
 * @swagger
 * /api/estado-libro-asociados:
 *   get:
 *     summary: Obtener todas las asociaciones
 *     responses:
 *       200:
 *         description: Lista de asociaciones entre estado y libro
 */
router.get('/estado-libro-asociados', estadoLibroAsociadoController.getEstadoLibroAsociados);

/**
 * @swagger
 * /api/estado-libro-asociados:
 *   post:
 *     summary: Crear una nueva asociación entre estado y libro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Estado:
 *                 type: string
 *               ID_Libro:
 *                 type: string
 *             required:
 *               - ID_Estado
 *               - ID_Libro
 *     responses:
 *       201:
 *         description: Asociación creada correctamente
 */
router.post('/estado-libro-asociados', estadoLibroAsociadoController.createEstadoLibroAsociado);

/**
 * @swagger
 * /api/estado-libro-asociados/{id}:
 *   get:
 *     summary: Obtener una asociación por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Asociación encontrada
 */
router.get('/estado-libro-asociados/:id', estadoLibroAsociadoController.getEstadoLibroAsociadoById);

/**
 * @swagger
 * /api/estado-libro-asociados/{id}:
 *   delete:
 *     summary: Eliminar una asociación por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Asociación eliminada correctamente
 */
router.delete('/estado-libro-asociados/:id', estadoLibroAsociadoController.deleteEstadoLibroAsociado);

module.exports = router;
