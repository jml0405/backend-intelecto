const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    Nombre: { type: String, required: true },
    Correo: { type: String, required: true, unique: true },
    Telefono: { type: String },
    Contraseña: { type: String, required: true },
    Imagen: { type: String } // URL a la imagen del usuario
});

// Exportar el modelo
module.exports = mongoose.model('Usuario', userSchema);
