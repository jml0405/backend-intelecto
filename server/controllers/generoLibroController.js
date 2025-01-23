const Genero_Libro = require('../models/generoLibroModel');

// Crear una nueva relación entre libro y género
exports.createGeneroLibro = async (req, res) => {
  const { ID_Libro, ID_Genero } = req.body;

  try {
    const nuevaRelacion = new Genero_Libro({ ID_Libro, ID_Genero });
    const relacionGuardada = await nuevaRelacion.save();
    res.status(201).json({ 
      message: 'Relación entre libro y género creada correctamente', 
      relacionId: relacionGuardada._id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las relaciones entre libros y géneros
exports.getGeneroLibros = async (req, res) => {
  try {
    const relaciones = await Genero_Libro.find()
      .populate('ID_Libro', 'Titulo Autor') // Ajustar según los campos en el modelo 'Libro'
      .populate('ID_Genero', 'genero'); // Ajustar según los campos en el modelo 'Genero'
    res.status(200).json(relaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una relación por ID
exports.getGeneroLibroById = async (req, res) => {
  try {
    const relacion = await Genero_Libro.findById(req.params.id)
      .populate('ID_Libro', 'Titulo Autor')
      .populate('ID_Genero', 'genero');
    if (!relacion) return res.status(404).json({ error: 'Relación no encontrada' });
    res.status(200).json(relacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una relación por ID
exports.deleteGeneroLibro = async (req, res) => {
  try {
    const relacionEliminada = await Genero_Libro.findByIdAndDelete(req.params.id);
    if (!relacionEliminada) return res.status(404).json({ error: 'Relación no encontrada' });
    res.status(200).json({ message: 'Relación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};