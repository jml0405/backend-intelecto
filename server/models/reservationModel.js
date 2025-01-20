const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    ID_Libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
    ID_Usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    Fecha_Reserva: { type: Date, default: Date.now },
    Fecha_Vencimiento: { type: Date, required: true }
});

// Middleware para calcular Fecha_Vencimiento automáticamente
reservaSchema.pre('save', function (next) {
    if (!this.Fecha_Vencimiento) {
        this.Fecha_Vencimiento = new Date(this.Fecha_Reserva.getTime() + 7 * 24 * 60 * 60 * 1000); // Suma 7 días
    }
    next();
});

module.exports = mongoose.model('Reserva', reservaSchema);
