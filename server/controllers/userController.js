// Obtener todos los usuarios (mock data)
exports.getUsers = async (req, res) => {
    try {
      // Datos ficticios
      const mockUsers = [
        { Id: 1, Name: 'Juan Pérez', Email: 'juan@example.com' },
        { Id: 2, Name: 'María Gómez', Email: 'maria@example.com' },
      ];
      res.status(200).json(mockUsers); // Retorna los datos ficticios
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).send('Error del servidor');
    }
  };
  
  // Crear un nuevo usuario (simulación)
  exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Simulación de inserción de usuario
      const newUserId = 123; // ID ficticio
      res.status(201).json({ message: 'Usuario creado', userId: newUserId });
    } catch (err) {
      console.error('Error al crear usuario:', err);
      res.status(500).send('Error del servidor');
    }
  };
  