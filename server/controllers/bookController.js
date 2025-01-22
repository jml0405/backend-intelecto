const fs = require('fs');
const crypto = require('crypto');
const Libro = require('../models/bookModel.js');
const multer = require('multer');
const path = require('path');





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/portadas/')); // Carpeta específica para portadas
  },
  filename: (req, file, cb) => {
    const filename = `${req.params.id}_coverimage${path.extname(file.originalname)}`;
    cb(null, filename); // Nombre del archivo basado en el ID del libro
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
const eliminarImagenAnterior = async (portadaActual) => {
  if (portadaActual && portadaActual !== '/uploads/portadas/default_cover.png') {

    const coverPath = path.join(__dirname, '..', portadaActual);
   if (fs.existsSync(coverPath)) {
         // Comparar hashes de la imagen actual y la nueva
         const hashActual = await generarHashArchivo(coverPath);
         const hashNuevo = await generarHashArchivo(nuevaRuta);
   
         // Solo eliminar si los hashes son diferentes
         if (hashActual !== hashNuevo) {
           fs.unlinkSync(coverPath);
         }
       }
  }
};

// Crear un libro
exports.createLibro = [
  upload.single('portada'), // Middleware de multer
  async (req, res) => {
    try {
      const portadaUrl = req.file ? `/uploads/portadas/${req.params.id}_coverimage${path.extname(req.file.originalname)}` : null;

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
// Subir o actualizar portada de un libro
exports.updatePortada = [
  upload.single('portada'), // Middleware de multer
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No se recibió ninguna imagen para la portada' });
      }

      // Buscar el libro para obtener la portada actual
      const libro = await Libro.findById(req.params.id);
      if (!libro) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }

     const nuevaRuta = path.join(__dirname, '../uploads/portadas/', `${req.params.id}_profileimage${path.extname(req.file.originalname)}`);
      
      // Eliminar la portada anterior si existe
      await eliminarImagenAnterior(libro.Portada, nuevaRuta);

      // Actualizar la portada con la nueva imagen
      const portadaUrl = `/uploads/portadas/${req.params.id}_coverimage${path.extname(req.file.originalname)}`;
      const libroActualizado = await Libro.findByIdAndUpdate(
        req.params.id,
        { Portada: portadaUrl }, // Actualiza el campo "Portada" en el modelo
        { new: true }
      );

      res.status(200).json({ message: 'Portada actualizada correctamente', libro: libroActualizado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];