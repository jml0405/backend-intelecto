const mongoose = require('mongoose');

const estadoLibroSchema = new mongoose.Schema({
    estado: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('EstadoLibro', estadoLibroSchema);
