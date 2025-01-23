const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorito:
 *       type: object
 *       properties:
 *         usuario:
 *           type: string
 *           description: ID del usuario.
 *         libro:
 *           type: string
 *           description: ID del libro.
 *         isFavorite:
 *           type: boolean
 *           description: Indica si el libro está marcado como favorito.
 *           default: false
 *         isReading:
 *           type: boolean
 *           description: Indica si el libro está marcado como en lectura.
 *           default: false
 *         fechaAgregado:
 *           type: string
 *           format: date-time
 *           description: Fecha en la que se agregó el libro.
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Agregar o actualizar el estado de un libro
 *     description: Agrega un libro a favoritos o lo actualiza como en lectura para un usuario.
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: ID del usuario.
 *               libro:
 *                 type: string
 *                 description: ID del libro.
 *               isFavorite:
 *                 type: boolean
 *                 description: Estado de favorito del libro.
 *               isReading:
 *                 type: boolean
 *                 description: Estado de lectura del libro.
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Favorito'
 *       400:
 *         description: Solicitud incorrecta.
 *       500:
 *         description: Error del servidor.
 */
router.post('/favorites', favoritosController.addOrUpdateStatus);

/**
 * @swagger
 * /api/favorites/{userId}:
 *   get:
 *     summary: Listar libros favoritos y en lectura de un usuario
 *     description: Devuelve una lista de libros marcados como favoritos o en lectura de un usuario específico.
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Lista de libros obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Favorito'
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.get('/favorites/:userId', favoritosController.getFavoritesAndReading);

/**
 * @swagger
 * /api/favorites:
 *   delete:
 *     summary: Eliminar un libro de favoritos o lectura
 *     description: Actualiza el estado de un libro para que ya no esté marcado como favorito ni en lectura.
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: ID del usuario.
 *               libro:
 *                 type: string
 *                 description: ID del libro.
 *     responses:
 *       200:
 *         description: Estado del libro actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Favorito'
 *       400:
 *         description: Solicitud incorrecta.
 *       404:
 *         description: El libro no está en favoritos o lectura.
 *       500:
 *         description: Error del servidor.
 */
router.delete('/favorites', favoritosController.removeFromFavoritesOrReading);

module.exports = router;