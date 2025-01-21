const Prestamo = require('../models/loanModel');

// Crear un préstamo
exports.createPrestamo = async (req, res) => {
  const { ID_Estudiante, ID_Libro, ID_Estado, MetodoPago, Monto } = req.body;

  try {
    const nuevoPrestamo = new Prestamo({ 
      ID_Estudiante, 
      ID_Libro, 
      ID_Estado, 
      MetodoPago, 
      Monto 
    });

    const prestamoGuardado = await nuevoPrestamo.save();
    res.status(201).json({
      message: 'Préstamo creado correctamente',
      prestamo: prestamoGuardado
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los préstamos
exports.getPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find()
      .populate('ID_Estudiante', 'Nombre Correo') // Ajustar los campos según el modelo Usuario
      .populate('ID_Libro', 'Titulo Autor') // Ajustar los campos según el modelo Libro
      .populate('ID_Estado', 'Estado') // Ajustar los campos según el modelo Estado_Prestamo
      .populate('MetodoPago', 'Metodo'); // Ajustar los campos según el modelo MetodoPago

    res.status(200).json(prestamos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Otros métodos (sin cambios)
exports.getPrestamoById = async (req, res) => {
  try {
    const prestamo = await Prestamo.findById(req.params.id)
      .populate('ID_Estudiante', 'Nombre Correo')
      .populate('ID_Libro', 'Titulo Autor')
      .populate('ID_Estado', 'Estado')
      .populate('MetodoPago', 'Metodo');

    if (!prestamo) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.status(200).json(prestamo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePrestamo = async (req, res) => {
  try {
    const prestamoActualizado = await Prestamo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('ID_Estudiante', 'Nombre Correo')
     .populate('ID_Libro', 'Titulo Autor')
     .populate('ID_Estado', 'Estado')
     .populate('MetodoPago', 'Metodo');

    if (!prestamoActualizado) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.status(200).json(prestamoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePrestamo = async (req, res) => {
  try {
    const prestamoEliminado = await Prestamo.findByIdAndDelete(req.params.id);
    if (!prestamoEliminado) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.status(200).json({ message: 'Préstamo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};