const mongoose = require('mongoose');

const generoLibroSchema = new mongoose.Schema({
  ID_Libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
  ID_Genero: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero', required: true } // Cambiado a 'Genero'
});

module.exports = mongoose.model('Genero_Libro', generoLibroSchema);
