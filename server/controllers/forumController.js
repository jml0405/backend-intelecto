const Foro = require('../models/forumModel');

// Obtener todos los foros
exports.getForos = async (req, res) => {
    try {
        const foros = await Foro.find().populate('ID_Usuario', 'nombre email');
        res.status(200).json(foros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo foro
exports.createForo = async (req, res) => {
    const { ID_Usuario, Titulo, Descripcion } = req.body;

    try {
        const nuevoForo = new Foro({ ID_Usuario, Titulo, Descripcion });
        const foroGuardado = await nuevoForo.save();
        res.status(201).json({ message: 'Foro creado correctamente', foroId: foroGuardado._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un foro por ID
exports.getForoById = async (req, res) => {
    try {
        const foro = await Foro.findById(req.params.id).populate('ID_Usuario', 'nombre email');
        if (!foro) return res.status(404).json({ error: 'Foro no encontrado' });
        res.status(200).json(foro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un foro por ID
exports.updateForo = async (req, res) => {
    try {
        const foroActualizado = await Foro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!foroActualizado) return res.status(404).json({ error: 'Foro no encontrado' });
        res.status(200).json({ message: 'Foro actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un foro por ID
exports.deleteForo = async (req, res) => {
    try {
        const foroEliminado = await Foro.findByIdAndDelete(req.params.id);
        if (!foroEliminado) return res.status(404).json({ error: 'Foro no encontrado' });
        res.status(200).json({ message: 'Foro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
