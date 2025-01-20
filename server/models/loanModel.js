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
    default: Date.now // Fecha del préstamo (se asigna automáticamente si no se proporciona)
  },
  Fecha_Devol: { 
    type: Date, 
    required: false // Fecha de devolución (puede ser opcional inicialmente)
  },
  ID_Estado: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Estado_Prestamo', 
    required: true // Un préstamo tiene un estado específico
  },
  ID_Factura: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Factura', 
    required: false // Opcional en caso de que no se genere factura inmediatamente
  }
});

module.exports = mongoose.model('Prestamo', prestamoSchema);
