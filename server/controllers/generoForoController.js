const GeneroForo = require('../models/generoForoModel');

// Obtener todas las asociaciones
exports.getGeneroForos = async (req, res) => {
    try {
        const asociaciones = await GeneroForo.find()
            .populate('ID_Genero', 'genero') // Asegúrate de que el modelo `Genero` tenga un campo `genero`
            .populate('ID_Foro', 'Titulo Descripcion');
        res.status(200).json(asociaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva asociación
exports.createGeneroForo = async (req, res) => {
    const { ID_Genero, ID_Foro } = req.body;

    try {
        const nuevaAsociacion = new GeneroForo({ ID_Genero, ID_Foro });
        const asociacionGuardada = await nuevaAsociacion.save();
        res.status(201).json({ message: 'Asociación creada correctamente', asociacionId: asociacionGuardada._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una asociación por ID
exports.getGeneroForoById = async (req, res) => {
    try {
        const asociacion = await GeneroForo.findById(req.params.id)
            .populate('ID_Genero', 'genero')
            .populate('ID_Foro', 'Titulo Descripcion');
        if (!asociacion) return res.status(404).json({ error: 'Asociación no encontrada' });
        res.status(200).json(asociacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una asociación por ID
exports.deleteGeneroForo = async (req, res) => {
    try {
        const asociacionEliminada = await GeneroForo.findByIdAndDelete(req.params.id);
        if (!asociacionEliminada) return res.status(404).json({ error: 'Asociación no encontrada' });
        res.status(200).json({ message: 'Asociación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
