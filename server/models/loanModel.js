const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
  ID_Estudiante: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true // Un préstamo pertenece a un usuario
  },
  ID_Libro: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Libro', 
    required: true // Un préstamo pertenece a un libro
  },
  Fecha_Prest: { 
    type: Date, 
    default: Date.now // Fecha de préstamo asignada automáticamente
  },
  Fecha_Devol: { 
    type: Date, 
    default: function () {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Fecha de devolución 7 días después
    }
  },
  ID_Estado: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'EstadoPrestamo', 
    required: true // Un préstamo tiene un estado específico
  },
  MetodoPago: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MetodoPago',
    required: true // El método de pago es obligatorio
  },
  Monto: {
    type: Number,
    required: true, // Monto del préstamo
    min: 0 // Validación: no puede ser negativo
  }
});

module.exports = mongoose.model('Prestamo', prestamoSchema);

