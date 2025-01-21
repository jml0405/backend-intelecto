const jwt = require('jsonwebtoken');
const Usuario = require('../models/userModel'); // Asegúrate de usar el modelo correcto

// Función para el login
exports.login = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        // Buscar al usuario en la base de datos
        
        const usuario = await Usuario.findOne({ Correo: correo });
        if (!usuario) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' }
            );
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await contrasena === usuario.Contraseña;
        if (!isMatch) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Generar un JWT para el usuario
        const payload = {
            userId: usuario._id,
            nombre: usuario.Nombre,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar el token al cliente
        res.status(200).json({
            message: 'Autenticación exitosa',
            token,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al autenticar al usuario' });
    }
};
