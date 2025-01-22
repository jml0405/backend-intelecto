const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/loanController');

/**
 * @swagger
 * /api/prestamos:
 *   get:
 *     summary: Obtener todos los préstamos
 *     description: Devuelve una lista de todos los préstamos registrados.
 *     responses:
 *       200:
 *         description: Lista de préstamos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Estudiante:
 *                     type: string
 *                   ID_Libro:
 *                     type: string
 *                   Fecha_Prest:
 *                     type: string
 *                   Fecha_Devol:
 *                     type: string
 *                   MetodoPago:
 *                     type: string
 *                   Monto:
 *                     type: number
 */
router.get('/prestamos', prestamoController.getPrestamos);

/**
 * @swagger
 * /api/prestamos:
 *   post:
 *     summary: Crear un nuevo préstamo
 *     description: Crea un nuevo préstamo en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Estudiante:
 *                 type: string
 *                 description: ID del estudiante que solicita el préstamo.
 *               ID_Libro:
 *                 type: string
 *                 description: ID del libro que se presta.
 *               ID_Estado:
 *                 type: string
 *                 description: ID del estado del préstamo.
 *               MetodoPago:
 *                 type: string
 *                 description: ID del método de pago utilizado.
 *               Monto:
 *                 type: number
 *                 description: Monto asociado al préstamo.
 *     responses:
 *       201:
 *         description: Préstamo creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 prestamo:
 *                   type: object
 */
router.post('/prestamos', prestamoController.createPrestamo);

/**
 * @swagger
 * /api/prestamos/{id}:
 *   get:
 *     summary: Obtener un préstamo por ID
 *     description: Obtiene los datos de un préstamo específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del préstamo.
 *     responses:
 *       200:
 *         description: Préstamo obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID_Estudiante:
 *                   type: string
 *                 ID_Libro:
 *                   type: string
 *                 Fecha_Prest:
 *                   type: string
 *                 Fecha_Devol:
 *                   type: string
 *                 MetodoPago:
 *                   type: string
 *                 Monto:
 *                   type: number
 *       404:
 *         description: Préstamo no encontrado.
 */
router.get('/prestamos/:id', prestamoController.getPrestamoById);

/**
 * @swagger
 * /api/prestamos/{id}:
 *   put:
 *     summary: Actualizar un préstamo por ID
 *     description: Permite actualizar los datos de un préstamo específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del préstamo a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Estudiante:
 *                 type: string
 *                 description: ID del estudiante asociado.
 *               ID_Libro:
 *                 type: string
 *                 description: ID del libro prestado.
 *               ID_Estado:
 *                 type: string
 *                 description: ID del estado del préstamo.
 *               MetodoPago:
 *                 type: string
 *                 description: ID del método de pago utilizado.
 *               Monto:
 *                 type: number
 *                 description: Monto asociado al préstamo.
 *     responses:
 *       200:
 *         description: Préstamo actualizado correctamente.
 *       404:
 *         description: Préstamo no encontrado.
 */
router.put('/prestamos/:id', prestamoController.updatePrestamo);

/**
 * @swagger
 * /api/prestamos/{id}:
 *   delete:
 *     summary: Eliminar un préstamo por ID
 *     description: Permite eliminar un préstamo específico de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del préstamo a eliminar.
 *     responses:
 *       200:
 *         description: Préstamo eliminado correctamente.
 *       404:
 *         description: Préstamo no encontrado.
 */
router.delete('/prestamos/:id', prestamoController.deletePrestamo);

module.exports = router;
