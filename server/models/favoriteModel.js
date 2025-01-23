const mongoose = require('mongoose');

const favoritosSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
  fechaAgregado: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Favoritos', favoritosSchema);
