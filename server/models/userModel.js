const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  Nombre: { type: String, required: true }, // Nombre de usuario
  Correo: { type: String, required: true, unique: true }, // Correo electrónico
  Contraseña: { type: String, required: true }, // Contraseña del usuario
  Telefono: { type: String, required: false }, // Teléfono del usuario
  Imagen: { type: String, default: '' }, // Imagen del usuario
  Favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Libro' }], // Relación con los libros favoritos
});

module.exports = mongoose.model('Usuario', usuarioSchema);
