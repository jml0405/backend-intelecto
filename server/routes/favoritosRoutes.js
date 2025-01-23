const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');

// Ruta para agregar o actualizar el estado de un libro (favorito o lectura)
router.post('/favorites', favoritosController.addOrUpdateStatus);

// Ruta para listar los libros favoritos y en lectura de un usuario
router.get('/favorites/:userId', favoritosController.getFavoritesAndReading);

// Ruta para eliminar un libro de favoritos o lectura
router.delete('/favorites', favoritosController.removeFromFavoritesOrReading);

module.exports = router;