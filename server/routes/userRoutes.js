const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   Nombre:
 *                     type: string
 *                   Correo:
 *                     type: string
 *                   Telefono:
 *                     type: string
 *                   Imagen:
 *                     type: string
 */
router.get('/users', userController.getUsers); // Obtener todos los usuarios

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *               Correo:
 *                 type: string
 *               Telefono:
 *                 type: string
 *               Contraseña:
 *                 type: string
 *               Imagen:
 *                 type: string
 *             required:
 *               - Nombre
 *               - Correo
 *               - Contraseña
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 */
router.post('/users', userController.createUser); // Crear un nuevo usuario

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Obtiene los datos de un usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 Nombre:
 *                   type: string
 *                 Correo:
 *                   type: string
 *                 Telefono:
 *                   type: string
 *                 Imagen:
 *                   type: string
 */
router.get('/users/:id', userController.getUserById); // Obtener un usuario por ID

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     description: Actualiza los datos de un usuario en la base de datos.
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
 *               Nombre:
 *                 type: string
 *               Correo:
 *                 type: string
 *               Telefono:
 *                 type: string
 *               Contraseña:
 *                 type: string
 *               Imagen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/users/:id', userController.updateUser); // Actualizar un usuario por ID

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     description: Elimina un usuario por su ID de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/users/:id', userController.deleteUser); // Eliminar un usuario por ID

module.exports = router;
