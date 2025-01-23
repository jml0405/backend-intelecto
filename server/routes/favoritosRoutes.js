const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');

// Ruta para agregar un libro a favoritos
router.post('/favorites', favoritosController.addToFavorites);

// Ruta para listar los libros favoritos de un usuario
router.get('/favorites/:userId', favoritosController.getFavorites);

// Ruta para eliminar un libro de favoritos
router.delete('/favorites', favoritosController.removeFromFavorites);

module.exports = router;