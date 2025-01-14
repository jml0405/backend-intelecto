const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  Titulo: { type: String, required: true },
  Autor: { type: String, required: true },
  Editorial: { type: String },
  ISBN: { type: String },
  Paginas: { type: Number },
  Dimensiones: { type: String },
  Fecha_Publ: { type: Date },
  Idioma: { type: String },
  Rating: { type: Number, default: 0 }, // Valor predeterminado para rating
  Portada: { type: String }, // URL de la imagen de portada
  ID_Estado_Libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Estado_Libro' }, // Referencia a la colección de "Estado_Libro"
  ID_Genero: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero_Libro' } // Referencia a la colección de "Genero_Libro"
});

module.exports = mongoose.model('Libro', libroSchema);
