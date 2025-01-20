const Reserva = require('../models/reservationModel');

// Obtener todas las reservas
exports.getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find().populate('ID_Libro ID_Usuario');
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
    const { ID_Libro, ID_Usuario } = req.body;
    
    // Calcular la Fecha_Vencimiento como 7 días después de la fecha actual
    const Fecha_Reserva = new Date();
    const Fecha_Vencimiento = new Date();
    Fecha_Vencimiento.setDate(Fecha_Reserva.getDate() + 7);

    try {
        const nuevaReserva = new Reserva({ ID_Libro, ID_Usuario, Fecha_Reserva, Fecha_Vencimiento });
        const reservaGuardada = await nuevaReserva.save();
        res.status(201).json({ message: 'Reserva creada correctamente', reservaId: reservaGuardada._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una reserva por ID
exports.getReservaById = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id).populate('ID_Libro ID_Usuario');
        if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una reserva por ID
exports.updateReserva = async (req, res) => {
    try {
        const reservaActualizada = await Reserva.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!reservaActualizada) return res.status(404).json({ error: 'Reserva no encontrada' });
        res.status(200).json({ message: 'Reserva actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una reserva por ID
exports.deleteReserva = async (req, res) => {
    try {
        const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
        if (!reservaEliminada) return res.status(404).json({ error: 'Reserva no encontrada' });
        res.status(200).json({ message: 'Reserva eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
