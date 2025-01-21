const express = require('express');
const router = express.Router();
const generoForoController = require('../controllers/generoForoController');

/**
 * @swagger
 * /api/genero-foros:
 *   get:
 *     summary: Obtener todas las asociaciones entre género y foro
 *     responses:
 *       200:
 *         description: Lista de asociaciones
 */
router.get('/genero-foros', generoForoController.getGeneroForos);

/**
 * @swagger
 * /api/genero-foros:
 *   post:
 *     summary: Crear una nueva asociación entre género y foro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Genero:
 *                 type: string
 *               ID_Foro:
 *                 type: string
 *             required:
 *               - ID_Genero
 *               - ID_Foro
 *     responses:
 *       201:
 *         description: Asociación creada correctamente
 */
router.post('/genero-foros', generoForoController.createGeneroForo);

/**
 * @swagger
 * /api/genero-foros/{id}:
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
router.get('/genero-foros/:id', generoForoController.getGeneroForoById);

/**
 * @swagger
 * /api/genero-foros/{id}:
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
router.delete('/genero-foros/:id', generoForoController.deleteGeneroForo);

module.exports = router;
