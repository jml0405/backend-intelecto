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
 *         description: Lista de préstamos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/prestamos', prestamoController.getPrestamos); // Obtener todos los préstamos

/**
 * @swagger
 * /api/prestamos:
 *   post:
 *     summary: Crear un nuevo préstamo
 *     description: Crea un nuevo préstamo en la base de datos con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Estudiante:
 *                 type: string
 *               ID_Libro:
 *                 type: string
 *               Fecha_Prest:
 *                 type: string
 *               Fecha_Devol:
 *                 type: string
 *               ID_Estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Préstamo creado correctamente
 */
router.post('/prestamos', prestamoController.createPrestamo); // Crear un nuevo préstamo

/**
 * @swagger
 * /api/prestamos/{id}:
 *   get:
 *     summary: Obtener un préstamo por ID
 *     description: Obtiene los datos de un préstamo por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Préstamo encontrado
 */
router.get('/prestamos/:id', prestamoController.getPrestamoById); // Obtener un préstamo por ID

/**
 * @swagger
 * /api/prestamos/{id}:
 *   put:
 *     summary: Actualizar un préstamo por ID
 *     description: Actualiza los datos de un préstamo en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Préstamo actualizado correctamente
 */
router.put('/prestamos/:id', prestamoController.updatePrestamo); // Actualizar un préstamo por ID

/**
 * @swagger
 * /api/prestamos/{id}:
 *   delete:
 *     summary: Eliminar un préstamo por ID
 *     description: Elimina un préstamo de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Préstamo eliminado correctamente
 */
router.delete('/prestamos/:id', prestamoController.deletePrestamo); // Eliminar un préstamo por ID

module.exports = router;
