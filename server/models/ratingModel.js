const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    ID_Libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true }, // FK
    ID_Usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // FK
    Puntaje: { type: Number, required: true, min: 1, max: 5 }, // Rating entre 1 y 5
    Comentario: { type: String, maxlength: 500 }, // Opcional
    Fecha_Rating: { type: Date, default: Date.now } // Fecha de creación
});

module.exports = mongoose.model('Rating', ratingSchema);
