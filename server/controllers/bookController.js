const fs = require('fs');
const crypto = require('crypto');
const Libro = require('../models/bookModel.js');
const Genero_Libro = require('../models/generoLibroModel'); // Importar el modelo de la tabla puente
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/portadas/')); // Carpeta específica para portadas
  },
  filename: (req, file, cb) => {
    const filename = `${req.params.id || Date.now()}_coverimage${path.extname(file.originalname)}`;
    cb(null, filename); // Nombre del archivo basado en el ID del libro o timestamp
  },
});

const upload = multer({ storage });

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

// Crear un libro con imagen obligatoria
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
// Obtener todos los libros con sus géneros
exports.getLibros = async (req, res) => {
  try {
    // Obtener todos los libros
    const libros = await Libro.find();

    // Para cada libro, obtener sus géneros relacionados
    const librosConGeneros = await Promise.all(
      libros.map(async (libro) => {
        // Obtener los géneros relacionados a través de la tabla puente
        const generosLibro = await Genero_Libro.find({ ID_Libro: libro._id })
          .populate('ID_Genero', 'nombre'); // Asegúrate de que el campo en el modelo de género sea 'nombre'

        // Extraer los nombres de los géneros
        const generos = generosLibro.map((relacion) => relacion.ID_Genero.nombre);

        // Agregar los géneros al objeto del libro
        return {
          ...libro.toObject(),
          generos,
        };
      })
    );

    res.status(200).json(librosConGeneros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un libro por ID con sus géneros
exports.getLibroById = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });

    // Obtener los géneros relacionados a través de la tabla puente
    const generosLibro = await Genero_Libro.find({ ID_Libro: libro._id })
      .populate('ID_Genero', 'nombre'); // Asegúrate de que el campo en el modelo de género sea 'nombre'

    // Extraer los nombres de los géneros
    const generos = generosLibro.map((relacion) => relacion.ID_Genero.nombre);

    // Agregar los géneros al objeto del libro
    const libroConGeneros = {
      ...libro.toObject(),
      generos,
    };

    res.status(200).json(libroConGeneros);
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