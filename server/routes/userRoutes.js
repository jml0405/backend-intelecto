const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas CRUD
router.post('/usuarios', userController.createUser); // Crear usuario
router.get('/usuarios', userController.getUsers);    // Obtener todos los usuarios
router.get('/usuarios/:id', userController.getUserById); // Obtener un usuario por ID
router.put('/usuarios/:id', userController.updateUser);  // Actualizar usuario por ID
router.delete('/usuarios/:id', userController.deleteUser); // Eliminar usuario por ID

module.exports = router;
