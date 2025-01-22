const multer = require('multer');
const path = require('path');
const Usuario = require('../models/userModel');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads/perfil/')); // Carpeta donde se guardarán las imágenes, relativa al proyecto
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para cada archivo
    },
  });
  
  const upload = multer({ storage });
  
  exports.createUser = async (req, res) => {
    try {
      console.log('Datos recibidos:', req.body); // Log para depurar los datos recibidos
      const nuevoUsuario = new Usuario(req.body);
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
  exports.uploadUserImage = [
    upload.single('image'), // Middleware de multer
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: 'No se recibió ninguna imagen' });
        }
  
        const imageUrl = `/uploads/perfil/${req.file.filename}`;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
          req.params.id,
          { Imagen: imageUrl }, // Actualiza el campo "Imagen" en el modelo
          { new: true }
        );
  
        if (!usuarioActualizado) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
  
        res.status(200).json({ message: 'Imagen subida correctamente', usuario: usuarioActualizado });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  ];
  