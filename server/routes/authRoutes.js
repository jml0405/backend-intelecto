const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a los usuarios autenticarse con su correo y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *             required:
 *               - correo
 *               - contrasena
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Correo o contraseña incorrectos
 *       500:
 *         description: Error en el servidor
 */
router.post('/login', authController.login); // Ruta de login

module.exports = router;
