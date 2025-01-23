const Favoritos = require('../models/favoriteModel');

// Agregar o actualizar el estado de un libro (favorito o lectura)
exports.addOrUpdateStatus = async (req, res) => {
  const { usuario, libro, isFavorite, isReading } = req.body;

  try {
    // Buscar si ya existe una entrada para este usuario y libro
    let favorito = await Favoritos.findOne({ usuario, libro });

    if (favorito) {
      // Si existe, actualizar los estados
      if (isFavorite !== undefined) {
        favorito.isFavorite = isFavorite;
      }
      if (isReading !== undefined) {
        favorito.isReading = isReading;
      }
    } else {
      // Si no existe, crear una nueva entrada
      favorito = new Favoritos({
        usuario,
        libro,
        isFavorite: isFavorite || false, // Por defecto, false si no se proporciona
        isReading: isReading || false,   // Por defecto, false si no se proporciona
      });
    }

    // Guardar los cambios
    await favorito.save();

    res.status(200).json({
      message: "Estado del libro actualizado correctamente.",
      data: favorito,
    });
  } catch (error) {
    console.error("Error al agregar o actualizar el estado del libro:", error);
    res.status(500).json({ error: "Error al procesar la solicitud." });
  }
};

// Obtener los libros favoritos y en lectura de un usuario
exports.getFavoritesAndReading = async (req, res) => {
  const { userId } = req.params;

  try {
    const favoritos = await Favoritos.find({ usuario: userId })
      .populate('libro') // Popula los detalles del libro
      .exec();

    res.status(200).json({
      message: "Libros favoritos y en lectura obtenidos correctamente.",
      data: favoritos,
    });
  } catch (error) {
    console.error("Error al obtener los libros favoritos y en lectura:", error);
    res.status(500).json({ error: "Error al procesar la solicitud." });
  }
};

// Eliminar un libro de favoritos o lectura (actualizando ambos estados a false)
// Eliminar un libro de favoritos o lectura (actualizando ambos estados a false)
exports.removeFromFavoritesOrReading = async (req, res) => {
  const { usuario, libro } = req.body;

  try {
    // Buscar la entrada del libro para el usuario
    const favorito = await Favoritos.findOne({ usuario, libro });

    if (!favorito) {
      return res.status(404).json({ error: "El libro no está en la lista de favoritos o lectura." });
    }

    // Actualizar ambos estados a false
    favorito.isFavorite = false;
    favorito.isReading = false;

    // Guardar los cambios
    await favorito.save();

    res.status(200).json({
      message: "Libro eliminado de favoritos y lectura correctamente.",
      data: favorito,
    });
  } catch (error) {
    console.error("Error al eliminar el libro de favoritos o lectura:", error);
    res.status(500).json({ error: "Error al procesar la solicitud." });
  }
};