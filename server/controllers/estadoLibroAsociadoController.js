const EstadoLibroAsociado = require('../models/estadoLibroAsociadoModel');

// Obtener todas las asociaciones
exports.getEstadoLibroAsociados = async (req, res) => {
    try {
        const asociaciones = await EstadoLibroAsociado.find()
            .populate('ID_Estado', 'estado')
            .populate('ID_Libro', 'titulo autor');
        res.status(200).json(asociaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva asociación
exports.createEstadoLibroAsociado = async (req, res) => {
    const { ID_Estado, ID_Libro } = req.body;

    try {
        const nuevaAsociacion = new EstadoLibroAsociado({ ID_Estado, ID_Libro });
        const asociacionGuardada = await nuevaAsociacion.save();
        res.status(201).json({ message: 'Asociación creada correctamente', asociacionId: asociacionGuardada._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una asociación por ID
exports.getEstadoLibroAsociadoById = async (req, res) => {
    try {
        const asociacion = await EstadoLibroAsociado.findById(req.params.id)
            .populate('ID_Estado', 'estado')
            .populate('ID_Libro', 'titulo autor');
        if (!asociacion) return res.status(404).json({ error: 'Asociación no encontrada' });
        res.status(200).json(asociacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una asociación por ID
exports.deleteEstadoLibroAsociado = async (req, res) => {
    try {
        const asociacionEliminada = await EstadoLibroAsociado.findByIdAndDelete(req.params.id);
        if (!asociacionEliminada) return res.status(404).json({ error: 'Asociación no encontrada' });
        res.status(200).json({ message: 'Asociación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};