const Libro = require('../models/bookModel.js');
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads/portadas/')); // Carpeta específica para portadas
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para cada archivo
    },
  });
  

const upload = multer({ storage });


// Crear un libro
exports.createLibro = [
    upload.single('portada'), // Middleware de multer
    async (req, res) => {
      try {
        const portadaUrl = req.file ? `/uploads/portadas/${req.file.filename}` : null;
  
        const nuevoLibro = new Libro({
          ...req.body,
          Portada: portadaUrl,
        });
  
        const libroGuardado = await nuevoLibro.save();
        res.status(201).json(libroGuardado);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  ];   
  
// Obtener todos los libros
exports.getLibros = async (req, res) => {
    try {
        const libros = await Libro.find();
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un libro por ID
exports.getLibroById = async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
        res.status(200).json(libro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un libro por ID
exports.updateLibro = async (req, res) => {
    try {
        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!libroActualizado) return res.status(404).json({ error: 'Libro no encontrado' });
        res.status(200).json(libroActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un libro por ID
exports.deleteLibro = async (req, res) => {
    try {
        const libroEliminado = await Libro.findByIdAndDelete(req.params.id);
        if (!libroEliminado) return res.status(404).json({ error: 'Libro no encontrado' });
        res.status(200).json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Subir portada de un libro
exports.updatePortada = [
    upload.single('portada'), // Middleware de multer
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: 'No se recibió ninguna imagen para la portada' });
        }
  
        const portadaUrl = `/uploads/portadas/${req.file.filename}`;
        const libroActualizado = await Libro.findByIdAndUpdate(
          req.params.id,
          { Portada: portadaUrl }, // Actualiza el campo "Portada" en el modelo
          { new: true }
        );
  
        if (!libroActualizado) {
          return res.status(404).json({ error: 'Libro no encontrado' });
        }
  
        res.status(200).json({ message: 'Portada actualizada correctamente', libro: libroActualizado });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  ];
  