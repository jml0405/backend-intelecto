const mongoose = require('mongoose');

const generoForoSchema = new mongoose.Schema({
    ID_Genero: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero', required: true },
    ID_Foro: { type: mongoose.Schema.Types.ObjectId, ref: 'Foro', required: true }
});

module.exports = mongoose.model('GeneroForo', generoForoSchema);
