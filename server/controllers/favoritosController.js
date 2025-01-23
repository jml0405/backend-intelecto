const Favoritos = require('../models/favoritosModel');

// Agregar o actualizar un libro en favoritos o lectura
exports.addOrUpdateStatus = async (req, res) => {
  try {
    const { userId, bookId, isFavorite, isReading } = req.body;

    // Verificar si ya existe el registro
    let favorito = await Favoritos.findOne({ usuario: userId, libro: bookId });

    if (favorito) {
      // Actualizar los estados de favorito y lectura
      favorito.isFavorite = isFavorite !== undefined ? isFavorite : favorito.isFavorite;
      favorito.isReading = isReading !== undefined ? isReading : favorito.isReading;
      await favorito.save();
    } else {
      // Crear un nuevo registro si no existe
      favorito = new Favoritos({
        usuario: userId,
        libro: bookId,
        isFavorite: isFavorite || false,
        isReading: isReading || false,
      });
      await favorito.save();
    }

    res.status(200).json({ message: 'Estado actualizado correctamente', favorito });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar libros favoritos y en lectura de un usuario
exports.getFavoritesAndReading = async (req, res) => {
  try {
    const { userId } = req.params;

    // Buscar todos los libros marcados como favoritos o en lectura del usuario
    const favoritos = await Favoritos.find({ usuario: userId }).populate('libro');

    res.status(200).json({ favoritos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un libro de favoritos o lectura
exports.removeFromFavoritesOrReading = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Buscar y eliminar el registro
    const eliminado = await Favoritos.findOneAndDelete({ usuario: userId, libro: bookId });
    if (!eliminado) {
      return res.status(404).json({ error: 'El libro no está en favoritos o lectura' });
    }

    res.status(200).json({ message: 'Libro eliminado de favoritos o lectura' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
