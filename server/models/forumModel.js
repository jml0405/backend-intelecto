const mongoose = require('mongoose');

const foroSchema = new mongoose.Schema({
    ID_Usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    Titulo: { type: String, required: true },
    Descripcion: { type: String, required: true },
    Vistas: { type: Number, default: 0 },
    Likes: { type: Number, default: 0 },
    Fecha_Foro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Foro', foroSchema);
