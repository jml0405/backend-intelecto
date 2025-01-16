const mongoose = require('mongoose');

const metodoPagoSchema = new mongoose.Schema({
    metodo: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('MetodoPago', metodoPagoSchema);
