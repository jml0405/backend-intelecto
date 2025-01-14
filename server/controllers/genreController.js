const Genero = require('../models/genreModel');

// Obtener todos los géneros
exports.getGeneros = async (req, res) => {
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo género
exports.createGenero = async (req, res) => {
    const { nombre } = req.body;
    
    try {
        const nuevoGenero = new Genero({ nombre });
        const generoGuardado = await nuevoGenero.save();
        res.status(201).json({ message: 'Género creado correctamente', generoId: generoGuardado._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un género por ID
exports.getGeneroById = async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) return res.status(404).json({ error: 'Género no encontrado' });
        res.status(200).json(genero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un género por ID
exports.updateGenero = async (req, res) => {
    try {
        const generoActualizado = await Genero.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!generoActualizado) return res.status(404).json({ error: 'Género no encontrado' });
        res.status(200).json({ message: 'Género actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un género por ID
exports.deleteGenero = async (req, res) => {
    try {
        const generoEliminado = await Genero.findByIdAndDelete(req.params.id);
        if (!generoEliminado) return res.status(404).json({ error: 'Género no encontrado' });
        res.status(200).json({ message: 'Género eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
