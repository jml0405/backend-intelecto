const EstadoPrestamo = require('../models/loanStatusModel');

// Obtener todos los estados de préstamo
exports.getEstadosPrestamo = async (req, res) => {
    try {
        const estados = await EstadoPrestamo.find();
        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo estado de préstamo
exports.createEstadoPrestamo = async (req, res) => {
    try {
        const nuevoEstado = new EstadoPrestamo({
            EstadoPrestamo: req.body.EstadoPrestamo
        });
        const estadoGuardado = await nuevoEstado.save();
        res.status(201).json({ 
            message: 'Estado de préstamo creado correctamente', 
            estadoId: estadoGuardado._id 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un estado de préstamo por ID
exports.getEstadoPrestamoById = async (req, res) => {
    try {
        const estado = await EstadoPrestamo.findById(req.params.id);
        if (!estado) return res.status(404).json({ error: 'Estado de préstamo no encontrado' });
        res.status(200).json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un estado de préstamo por ID
exports.updateEstadoPrestamo = async (req, res) => {
    try {
        const estadoActualizado = await EstadoPrestamo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!estadoActualizado) return res.status(404).json({ error: 'Estado de préstamo no encontrado' });
        res.status(200).json({ message: 'Estado de préstamo actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un estado de préstamo por ID
exports.deleteEstadoPrestamo = async (req, res) => {
    try {
        const estadoEliminado = await EstadoPrestamo.findByIdAndDelete(req.params.id);
        if (!estadoEliminado) return res.status(404).json({ error: 'Estado de préstamo no encontrado' });
        res.status(200).json({ message: 'Estado de préstamo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
