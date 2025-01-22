const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const Usuario = require('../models/userModel');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/perfil/')); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const filename = `${req.params.id}_profileimage${path.extname(file.originalname)}`;
    cb(null, filename); // Nombre del archivo basado en el ID del usuario
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
const eliminarImagenAnterior = async (perfilActual, nuevaRuta) => {
  if (perfilActual && perfilActual !== '/uploads/perfil/default_profile_picture.png') {
    const perfilPath = path.join(__dirname, '..', perfilActual);

    // Verificar si el archivo existe
    if (fs.existsSync(perfilPath)) {
      // Comparar hashes de la imagen actual y la nueva
      const hashActual = await generarHashArchivo(perfilPath);
      const hashNuevo = await generarHashArchivo(nuevaRuta);

      // Solo eliminar si los hashes son diferentes
      if (hashActual !== hashNuevo) {
        fs.unlinkSync(perfilPath);
      }
    }
  }
};

  exports.createUser = async (req, res) => {
    try {
      const defaultImage = '/uploads/perfil/default_profile_picture.png'; // Ruta de la imagen predeterminada
      const nuevoUsuario = new Usuario({
        ...req.body,
        Imagen: defaultImage, // Asignar la imagen predeterminada
      });
      const usuarioGuardado = await nuevoUsuario.save();
      console.log('Usuario creado:', usuarioGuardado); // Log para confirmar la creación
      res.status(201).json(usuarioGuardado);
    } catch (error) {
      console.error('Error al crear usuario:', error.message); // Log para errores
      res.status(400).json({ error: error.message });
    }
  };
  
  // Obtener todos los usuarios
  exports.getUsers = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener un usuario por ID
  exports.getUserById = async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Actualizar un usuario por ID
  exports.updateUser = async (req, res) => {
    try {
      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!usuarioActualizado) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.status(200).json(usuarioActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Eliminar un usuario por ID
  exports.deleteUser = async (req, res) => {
    try {
      const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
      if (!usuarioEliminado) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Actualizar solo el password de un usuario por ID
  exports.updatePassword = async (req, res) => {
    try {
      const { password } = req.body;
  
      if (!password) {
        return res.status(400).json({ error: 'El campo "password" es requerido' });
      }
  
      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        req.params.id,
        { Contraseña: password },
        { new: true }
      );
  
      if (!usuarioActualizado) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      res.status(200).json({ message: 'Password actualizado correctamente', usuario: usuarioActualizado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Subir imagen de usuario
  // Subir o actualizar la imagen de perfil de un usuario
exports.uploadUserImage = [
  upload.single('image'), // Middleware de multer
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No se recibió ninguna imagen' });
      }

      // Buscar el usuario para obtener la imagen actual
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Ruta de la nueva imagen
      const nuevaRuta = path.join(__dirname, '../uploads/perfil/', `${req.params.id}_profileimage${path.extname(req.file.originalname)}`);

      // Eliminar la imagen anterior si es diferente
      await eliminarImagenAnterior(usuario.Imagen, nuevaRuta);

      // Actualizar la imagen con la nueva imagen
      const imageUrl = `/uploads/perfil/${req.params.id}_profileimage${path.extname(req.file.originalname)}`;
      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        req.params.id,
        { Imagen: imageUrl }, // Actualiza el campo "Imagen" en el modelo
        { new: true }
      );

      res.status(200).json({ message: 'Imagen actualizada correctamente', usuario: usuarioActualizado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];