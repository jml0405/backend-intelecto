const Prestamo = require('../models/loanModel.js');

// Crear un préstamo
exports.createPrestamo = async (req, res) => {
    try {
        const nuevoPrestamo = new Prestamo(req.body);
        const prestamoGuardado = await nuevoPrestamo.save();
        res.status(201).json(prestamoGuardado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los préstamos
exports.getPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.find().populate('ID_Estudiante').populate('ID_Libro').populate('ID_Estado');
        res.status(200).json(prestamos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un préstamo por ID
exports.getPrestamoById = async (req, res) => {
    try {
        const prestamo = await Prestamo.findById(req.params.id).populate('ID_Estudiante').populate('ID_Libro').populate('ID_Estado');
        if (!prestamo) return res.status(404).json({ error: 'Préstamo no encontrado' });
        res.status(200).json(prestamo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un préstamo por ID
exports.updatePrestamo = async (req, res) => {
    try {
        const prestamoActualizado = await Prestamo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('ID_Estudiante').populate('ID_Libro').populate('ID_Estado');
        if (!prestamoActualizado) return res.status(404).json({ error: 'Préstamo no encontrado' });
        res.status(200).json(prestamoActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un préstamo por ID
exports.deletePrestamo = async (req, res) => {
    try {
        const prestamoEliminado = await Prestamo.findByIdAndDelete(req.params.id);
        if (!prestamoEliminado) return res.status(404).json({ error: 'Préstamo no encontrado' });
        res.status(200).json({ message: 'Préstamo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
