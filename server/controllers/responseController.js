const Respuesta = require('../models/responseModel');

// Obtener todas las respuestas
exports.getRespuestas = async (req, res) => {
    try {
        const respuestas = await Respuesta.find()
            .populate('ID_Foro', 'Titulo')
            .populate('ID_Usuario', 'nombre email');
        res.status(200).json(respuestas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva respuesta
exports.createRespuesta = async (req, res) => {
    const { ID_Foro, ID_Usuario, Respuesta: contenidoRespuesta } = req.body;

    try {
        const nuevaRespuesta = new Respuesta({ 
            ID_Foro, 
            ID_Usuario, 
            Respuesta: contenidoRespuesta 
        });
        const respuestaGuardada = await nuevaRespuesta.save();
        res.status(201).json({ 
            message: 'Respuesta creada correctamente', 
            respuestaId: respuestaGuardada._id 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una respuesta por ID
exports.getRespuestaById = async (req, res) => {
    try {
        const respuesta = await Respuesta.findById(req.params.id)
            .populate('ID_Foro', 'Titulo')
            .populate('ID_Usuario', 'nombre email');
        if (!respuesta) return res.status(404).json({ error: 'Respuesta no encontrada' });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una respuesta por ID
exports.updateRespuesta = async (req, res) => {
    try {
        const respuestaActualizada = await Respuesta.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!respuestaActualizada) return res.status(404).json({ error: 'Respuesta no encontrada' });
        res.status(200).json({ message: 'Respuesta actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una respuesta por ID
exports.deleteRespuesta = async (req, res) => {
    try {
        const respuestaEliminada = await Respuesta.findByIdAndDelete(req.params.id);
        if (!respuestaEliminada) return res.status(404).json({ error: 'Respuesta no encontrada' });
        res.status(200).json({ message: 'Respuesta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
