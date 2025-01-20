const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');

/**
 * @swagger
 * /api/respuestas:
 *   get:
 *     summary: Obtener todas las respuestas
 *     responses:
 *       200:
 *         description: Lista de respuestas
 */
router.get('/respuestas', responseController.getRespuestas);

/**
 * @swagger
 * /api/respuestas:
 *   post:
 *     summary: Crear una nueva respuesta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Foro:
 *                 type: string
 *               ID_Usuario:
 *                 type: string
 *               Respuesta:
 *                 type: string
 *             required:
 *               - ID_Foro
 *               - ID_Usuario
 *               - Respuesta
 *     responses:
 *       201:
 *         description: Respuesta creada correctamente
 */
router.post('/respuestas', responseController.createRespuesta);

/**
 * @swagger
 * /api/respuestas/{id}:
 *   get:
 *     summary: Obtener una respuesta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Respuesta encontrada
 */
router.get('/respuestas/:id', responseController.getRespuestaById);

/**
 * @swagger
 * /api/respuestas/{id}:
 *   put:
 *     summary: Actualizar una respuesta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Respuesta:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta actualizada correctamente
 */
router.put('/respuestas/:id', responseController.updateRespuesta);

/**
 * @swagger
 * /api/respuestas/{id}:
 *   delete:
 *     summary: Eliminar una respuesta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Respuesta eliminada correctamente
 */
router.delete('/respuestas/:id', responseController.deleteRespuesta);

module.exports = router;
