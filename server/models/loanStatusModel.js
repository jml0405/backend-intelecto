const mongoose = require('mongoose');

const estadoPrestamoSchema = new mongoose.Schema({
    EstadoPrestamo: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('EstadoPrestamo', estadoPrestamoSchema);

