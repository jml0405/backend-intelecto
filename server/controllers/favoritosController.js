const Favoritos = require('../models/favoritosModel');

// Agregar un libro a favoritos
exports.addToFavorites = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Verificar si ya existe el favorito
    const existeFavorito = await Favoritos.findOne({ usuario: userId, libro: bookId });
    if (existeFavorito) {
      return res.status(400).json({ error: 'El libro ya está en favoritos' });
    }

    // Crear un nuevo favorito
    const nuevoFavorito = new Favoritos({ usuario: userId, libro: bookId });
    await nuevoFavorito.save();

    res.status(200).json({ message: 'Libro agregado a favoritos', favorito: nuevoFavorito });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar libros favoritos de un usuario
exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    // Buscar todos los favoritos del usuario y popular los datos del libro
    const favoritos = await Favoritos.find({ usuario: userId }).populate('libro');

    res.status(200).json({ favoritos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un libro de favoritos
exports.removeFromFavorites = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Buscar y eliminar el favorito
    const eliminado = await Favoritos.findOneAndDelete({ usuario: userId, libro: bookId });
    if (!eliminado) {
      return res.status(404).json({ error: 'El libro no está en favoritos' });
    }

    res.status(200).json({ message: 'Libro eliminado de favoritos' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
