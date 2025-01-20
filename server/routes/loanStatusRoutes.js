const express = require('express');
const router = express.Router();
const estadoPrestamoController = require('../controllers/loanStatusController');

/**
 * @swagger
 * /api/estados-prestamo:
 *   get:
 *     summary: Obtener todos los estados de préstamo
 *     description: Devuelve una lista de todos los estados de préstamo registrados.
 *     responses:
 *       200:
 *         description: Lista de estados de préstamo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   EstadoPrestamo:
 *                     type: string
 */
router.get('/estados-prestamo', estadoPrestamoController.getEstadosPrestamo); // Obtener todos los estados

/**
 * @swagger
 * /api/estados-prestamo:
 *   post:
 *     summary: Crear un nuevo estado de préstamo
 *     description: Crea un nuevo estado de préstamo con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EstadoPrestamo:
 *                 type: string
 *             required:
 *               - EstadoPrestamo
 *     responses:
 *       201:
 *         description: Estado de préstamo creado correctamente
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
router.post('/estados-prestamo', estadoPrestamoController.createEstadoPrestamo); // Crear un estado

/**
 * @swagger
 * /api/estados-prestamo/{id}:
 *   get:
 *     summary: Obtener un estado de préstamo por ID
 *     description: Obtiene los datos de un estado de préstamo específico a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado de préstamo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 EstadoPrestamo:
 *                   type: string
 */
router.get('/estados-prestamo/:id', estadoPrestamoController.getEstadoPrestamoById); // Obtener un estado por ID

/**
 * @swagger
 * /api/estados-prestamo/{id}:
 *   put:
 *     summary: Actualizar un estado de préstamo por ID
 *     description: Actualiza los datos de un estado de préstamo existente a partir de su ID.
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
 *               EstadoPrestamo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estado de préstamo actualizado correctamente
 */
router.put('/estados-prestamo/:id', estadoPrestamoController.updateEstadoPrestamo); // Actualizar un estado por ID

/**
 * @swagger
 * /api/estados-prestamo/{id}:
 *   delete:
 *     summary: Eliminar un estado de préstamo por ID
 *     description: Elimina un estado de préstamo específico a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado de préstamo eliminado correctamente
 */
router.delete('/estados-prestamo/:id', estadoPrestamoController.deleteEstadoPrestamo); // Eliminar un estado por ID

module.exports = router;
