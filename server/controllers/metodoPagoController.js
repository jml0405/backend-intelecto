const MetodoPago = require('../models/metodoPagoModel');

// Obtener todos los métodos de pago
exports.getMetodosPago = async (req, res) => {
    try {
        const metodos = await MetodoPago.find();
        res.status(200).json(metodos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo método de pago
exports.createMetodoPago = async (req, res) => {
    const { metodo } = req.body;

    try {
        const nuevoMetodo = new MetodoPago({ metodo });
        const metodoGuardado = await nuevoMetodo.save();
        res.status(201).json({ message: 'Método de pago creado correctamente', metodoId: metodoGuardado._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un método de pago por ID
exports.getMetodoPagoById = async (req, res) => {
    try {
        const metodo = await MetodoPago.findById(req.params.id);
        if (!metodo) return res.status(404).json({ error: 'Método de pago no encontrado' });
        res.status(200).json(metodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un método de pago por ID
exports.updateMetodoPago = async (req, res) => {
    try {
        const metodoActualizado = await MetodoPago.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!metodoActualizado) return res.status(404).json({ error: 'Método de pago no encontrado' });
        res.status(200).json({ message: 'Método de pago actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un método de pago por ID
exports.deleteMetodoPago = async (req, res) => {
    try {
        const metodoEliminado = await MetodoPago.findByIdAndDelete(req.params.id);
        if (!metodoEliminado) return res.status(404).json({ error: 'Método de pago no encontrado' });
        res.status(200).json({ message: 'Método de pago eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
