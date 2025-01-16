const express = require('express');
const router = express.Router();
const metodoPagoController = require('../controllers/metodoPagoController');

/**
 * @swagger
 * /api/metodo-pagos:
 *   get:
 *     summary: Obtener todos los métodos de pago
 *     description: Devuelve una lista de todos los métodos de pago registrados.
 *     responses:
 *       200:
 *         description: Lista de métodos de pago
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   metodo:
 *                     type: string
 */
router.get('/metodo-pagos', metodoPagoController.getMetodosPago); // Obtener todos los métodos de pago

/**
 * @swagger
 * /api/metodo-pagos:
 *   post:
 *     summary: Crear un nuevo método de pago
 *     description: Crea un nuevo método de pago en la base de datos con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metodo:
 *                 type: string
 *             required:
 *               - metodo
 *     responses:
 *       201:
 *         description: Método de pago creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 metodoId:
 *                   type: string
 */
router.post('/metodo-pagos', metodoPagoController.createMetodoPago); // Crear un nuevo método de pago

/**
 * @swagger
 * /api/metodo-pagos/{id}:
 *   get:
 *     summary: Obtener un método de pago por ID
 *     description: Obtiene los datos de un método de pago específico a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Método de pago encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 metodo:
 *                   type: string
 */
router.get('/metodo-pagos/:id', metodoPagoController.getMetodoPagoById); // Obtener un método de pago por ID

/**
 * @swagger
 * /api/metodo-pagos/{id}:
 *   put:
 *     summary: Actualizar un método de pago por ID
 *     description: Actualiza los datos de un método de pago existente a partir de su ID.
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
 *               metodo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Método de pago actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/metodo-pagos/:id', metodoPagoController.updateMetodoPago); // Actualizar un método de pago por ID

/**
 * @swagger
 * /api/metodo-pagos/{id}:
 *   delete:
 *     summary: Eliminar un método de pago por ID
 *     description: Elimina un método de pago específico a partir de su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Método de pago eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/metodo-pagos/:id', metodoPagoController.deleteMetodoPago); // Eliminar un método de pago por ID

module.exports = router;
