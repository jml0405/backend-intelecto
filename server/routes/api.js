const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para obtener usuarios
router.get('/users', userController.getUsers);

module.exports = router; // Exporta el enrutador
