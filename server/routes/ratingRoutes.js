const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

/**
 * @swagger
 * /api/ratings:
 *   get:
 *     summary: Obtener todos los ratings
 *     description: Devuelve una lista de todos los ratings registrados.
 *     responses:
 *       200:
 *         description: Lista de ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Libro:
 *                     type: string
 *                   ID_Usuario:
 *                     type: string
 *                   Puntaje:
 *                     type: integer
 *                   Comentario:
 *                     type: string
 *                   Fecha_Rating:
 *                     type: string
 */
router.get('/ratings', ratingController.getRatings);


/**
 * @swagger
 * /api/ratings/libro/{idLibro}:
 *   get:
 *     summary: Obtener reseñas por ID de libro
 *     description: Devuelve una lista de reseñas asociadas a un libro específico.
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: idLibro
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Lista de reseñas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rating'
 *       500:
 *         description: Error del servidor
 */
router.get("/ratings/libro/:idLibro", ratingController.getRatingsByLibro);


/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Crear un nuevo rating
 *     description: Crea un nuevo rating en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Libro:
 *                 type: string
 *               ID_Usuario:
 *                 type: string
 *               Puntaje:
 *                 type: integer
 *               Comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rating creado correctamente
 */
router.post('/ratings', ratingController.createRating);

/**
 * @swagger
 * /api/ratings/{id}:
 *   get:
 *     summary: Obtener un rating por ID
 *     description: Obtiene un rating específico a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rating encontrado
 */
router.get('/ratings/:id', ratingController.getRatingById);

/**
 * @swagger
 * /api/ratings/{id}:
 *   put:
 *     summary: Actualizar un rating por ID
 *     description: Actualiza un rating existente a partir de su ID.
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
 *               Puntaje:
 *                 type: integer
 *               Comentario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rating actualizado correctamente
 */
router.put('/ratings/:id', ratingController.updateRating);

/**
 * @swagger
 * /api/ratings/{id}:
 *   delete:
 *     summary: Eliminar un rating por ID
 *     description: Elimina un rating específico a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rating eliminado correctamente
 */
router.delete('/ratings/:id', ratingController.deleteRating);

module.exports = router;
