const Genero_Libro = require('../models/generoLibroModel');

// Crear Genero de Libro
exports.createGeneroLibro = async (req, res) => {
  try {
    const generoLibro = new Genero_Libro(req.body);
    const savedGeneroLibro = await generoLibro.save();
    res.status(201).json(savedGeneroLibro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los Generos de Libros
exports.getGeneroLibros = async (req, res) => {
  try {
    const generoLibros = await Genero_Libro.find();
    res.status(200).json(generoLibros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
