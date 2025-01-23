const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Libro' }], // Relación con los libros
});

module.exports = mongoose.model('Usuario', userSchema);

