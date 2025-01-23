const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
  ID_Estudiante: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },
  ID_Libro: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Libro', 
    required: true 
  },
  Fecha_Prest: { 
    type: Date, 
    default: Date.now 
  },
  Fecha_Devol: { 
    type: Date, 
    default: function () {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
  },
  ID_Estado: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'EstadoPrestamo', 
    required: true 
  },
  MetodoPago: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MetodoPago',
    required: true 
  },
  Monto: {
    type: Number,
    required: true,
    min: 0
  },
  Codigo: { 
    type: String, 
    required: true, 
    unique: true 
  }
});

// Pre-hook para generar el Código antes de la validación
prestamoSchema.pre('validate', function (next) {
  if (!this.Codigo) {
    this.Codigo = Math.floor(100000 + Math.random() * 900000).toString(); // Genera un número aleatorio de 6 dígitos
  }
  next();
});

module.exports = mongoose.model('Prestamo', prestamoSchema);