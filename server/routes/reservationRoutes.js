const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtener todas las reservas
 *     description: Devuelve una lista de todas las reservas registradas.
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   ID_Libro:
 *                     type: string
 *                   ID_Usuario:
 *                     type: string
 *                   Fecha_Reserva:
 *                     type: string
 *                   Fecha_Vencimiento:
 *                     type: string
 */
router.get('/reservas', reservationController.getReservas);

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     description: Crea una nueva reserva en la base de datos con los datos proporcionados.
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
 *             required:
 *               - ID_Libro
 *               - ID_Usuario
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reservaId:
 *                   type: string
 */
router.post('/reservas', reservationController.createReserva);

/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     description: Obtiene los datos de una reserva específica a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 ID_Libro:
 *                   type: string
 *                 ID_Usuario:
 *                   type: string
 *                 Fecha_Reserva:
 *                   type: string
 *                 Fecha_Vencimiento:
 *                   type: string
 */
router.get('/reservas/:id', reservationController.getReservaById);

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva por ID
 *     description: Actualiza los datos de una reserva existente a partir de su ID.
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
 *               ID_Libro:
 *                 type: string
 *               ID_Usuario:
 *                 type: string
 *               Fecha_Reserva:
 *                 type: string
 *               Fecha_Vencimiento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reserva actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/reservas/:id', reservationController.updateReserva);

/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva por ID
 *     description: Elimina una reserva específica a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/reservas/:id', reservationController.deleteReserva);

module.exports = router;
