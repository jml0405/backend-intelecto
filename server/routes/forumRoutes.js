const express = require('express');
const router = express.Router();
const foroController = require('../controllers/forumController');

/**
 * @swagger
 * /api/foros:
 *   get:
 *     summary: Obtener todos los foros
 *     responses:
 *       200:
 *         description: Lista de foros
 */
router.get('/foros', foroController.getForos);

/**
 * @swagger
 * /api/foros:
 *   post:
 *     summary: Crear un nuevo foro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Usuario:
 *                 type: string
 *               Titulo:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *             required:
 *               - ID_Usuario
 *               - Titulo
 *               - Descripcion
 *     responses:
 *       201:
 *         description: Foro creado correctamente
 */
router.post('/foros', foroController.createForo);

/**
 * @swagger
 * /api/foros/{id}:
 *   get:
 *     summary: Obtener un foro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Foro encontrado
 */
router.get('/foros/:id', foroController.getForoById);

/**
 * @swagger
 * /api/foros/{id}:
 *   put:
 *     summary: Actualizar un foro por ID
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
 *               Titulo:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               Vistas:
 *                 type: number
 *               Likes:
 *                 type: number
 *     responses:
 *       200:
 *         description: Foro actualizado correctamente
 */
router.put('/foros/:id', foroController.updateForo);

/**
 * @swagger
 * /api/foros/{id}:
 *   delete:
 *     summary: Eliminar un foro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Foro eliminado correctamente
 */
router.delete('/foros/:id', foroController.deleteForo);

module.exports = router;
