const fs = require('fs');
const crypto = require('crypto');
const Libro = require('../models/bookModel.js');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/portadas/')); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const filename = `${req.params.id || Date.now()}_coverimage${path.extname(file.originalname)}`;
    cb(null, filename); // Nombre del archivo basado en el ID del libro o timestamp
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Extensiones permitidas
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes en formato JPEG, JPG o PNG'));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // Límite de tamaño: 2MB
});

// Generar hash de un archivo
const generarHashArchivo = (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);

    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', (err) => reject(err));
  });
};

// Función para eliminar la imagen anterior
const eliminarImagenAnterior = async (portadaActual, nuevaRuta) => {
  if (portadaActual && portadaActual !== '/uploads/portadas/default_cover.jpg') {
    const coverPath = path.join(__dirname, '..', portadaActual);
    if (fs.existsSync(coverPath)) {
      const hashActual = await generarHashArchivo(coverPath);
      const hashNuevo = await generarHashArchivo(nuevaRuta);
      if (hashActual !== hashNuevo) {
        fs.unlinkSync(coverPath);
      }
    }
  }
};

// Crear un libro con selección obligatoria de imagen
exports.createLibro = [
  upload.single('portada'), // Middleware de multer para subir la imagen
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'La portada es obligatoria al crear un libro' });
      }

      const portadaUrl = `/uploads/portadas/${req.file.filename}`;

      const nuevoLibro = new Libro({
        ...req.body,
        Portada: portadaUrl, // Portada proporcionada
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

// Subir o actualizar portada de un libro (imagen obligatoria)
exports.updatePortada = [
  upload.single('portada'), // Middleware de multer
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'La nueva portada es obligatoria' });
      }

      const libro = await Libro.findById(req.params.id);
      if (!libro) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }

      const nuevaRuta = path.join(__dirname, '../uploads/portadas/', req.file.filename);
      await eliminarImagenAnterior(libro.Portada, nuevaRuta);

      const portadaUrl = `/uploads/portadas/${req.file.filename}`;
      const libroActualizado = await Libro.findByIdAndUpdate(
        req.params.id,
        { Portada: portadaUrl },
        { new: true }
      );

      res.status(200).json({ message: 'Portada actualizada correctamente', libro: libroActualizado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];
