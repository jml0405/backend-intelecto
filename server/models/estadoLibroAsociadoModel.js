const mongoose = require('mongoose');

const estadoLibroAsociadoSchema = new mongoose.Schema({
    ID_Estado: { type: mongoose.Schema.Types.ObjectId, ref: 'EstadoLibro', required: true },
    ID_Libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true }
});

module.exports = mongoose.model('EstadoLibroAsociado', estadoLibroAsociadoSchema);
