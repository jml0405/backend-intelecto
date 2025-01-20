const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
    ID_Foro: { type: mongoose.Schema.Types.ObjectId, ref: 'Foro', required: true },
    ID_Usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    Respuesta: { type: String, required: true },
    Fecha_Resp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Respuesta', respuestaSchema);
