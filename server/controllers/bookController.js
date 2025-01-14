const Libro = require('../models/bookModel.js');

// Crear un libro
exports.createLibro = async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        const libroGuardado = await nuevoLibro.save();
        res.status(201).json(libroGuardado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los libros
exports.getLibros = async (req, res) => {
    try {
        const libros = await Libro.find();
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un libro por ID
exports.getLibroById = async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
        res.status(200).json(libro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un libro por ID
exports.updateLibro = async (req, res) => {
    try {
        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!libroActualizado) return res.status(404).json({ error: 'Libro no encontrado' });
        res.status(200).json(libroActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un libro por ID
exports.deleteLibro = async (req, res) => {
    try {
        const libroEliminado = await Libro.findByIdAndDelete(req.params.id);
        if (!libroEliminado) return res.status(404).json({ error: 'Libro no encontrado' });
        res.status(200).json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
