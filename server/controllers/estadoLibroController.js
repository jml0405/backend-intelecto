const EstadoLibro = require('../models/estadoLibroModel');

// Obtener todos los estados de libro
exports.getEstadosLibros = async (req, res) => {
    try {
        const estados = await EstadoLibro.find();
        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo estado de libro
exports.createEstadoLibro = async (req, res) => {
    const { estado } = req.body;

    try {
        const nuevoEstado = new EstadoLibro({ estado });
        const estadoGuardado = await nuevoEstado.save();
        res.status(201).json({ message: 'Estado de libro creado correctamente', estadoId: estadoGuardado._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un estado de libro por ID
exports.getEstadoLibroById = async (req, res) => {
    try {
        const estado = await EstadoLibro.findById(req.params.id);
        if (!estado) return res.status(404).json({ error: 'Estado de libro no encontrado' });
        res.status(200).json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un estado de libro por ID
exports.updateEstadoLibro = async (req, res) => {
    try {
        const estadoActualizado = await EstadoLibro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!estadoActualizado) return res.status(404).json({ error: 'Estado de libro no encontrado' });
        res.status(200).json({ message: 'Estado de libro actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un estado de libro por ID
exports.deleteEstadoLibro = async (req, res) => {
    try {
        const estadoEliminado = await EstadoLibro.findByIdAndDelete(req.params.id);
        if (!estadoEliminado) return res.status(404).json({ error: 'Estado de libro no encontrado' });
        res.status(200).json({ message: 'Estado de libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
