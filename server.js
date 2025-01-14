require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { MongoClient, ServerApiVersion } = require('mongodb'); // Importa MongoClient y ServerApiVersion
const userRoutes = require('./server/routes/userRoutes');
const bookRoutes = require('./server/routes/bookRoutes');
const genreRoutes = require('./server/routes/genreRoutes.js');
const authRoutes = require('./server/routes/authRoutes');

// Obtiene la URI de MongoDB y el puerto desde las variables de entorno
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Inicializa la aplicación Express
const app = express();

// Middleware para manejar JSON
app.use(express.json({ limit: '1mb' })); // Límite de tamaño para manejar JSON

// Configuración de Swagger-JSDoc
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Intelecto API',
      version: '1.0.0',
      description: 'Documentación de la API para el proyecto Backend Intelecto.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // Utiliza el puerto del servidor
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./server/routes/*.js'], // Asegúrate de que esta ruta apunte a tus archivos de rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Rutas API
app.use('/api', userRoutes);
app.use('/api', bookRoutes);
app.use('/api', genreRoutes);
app.use('/api', authRoutes);

// Usar Swagger UI para exponer la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Función para conectar a MongoDB
async function connectToDatabase() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    connectTimeoutMS: 30000, // Tiempo de espera para conectar (30 segundos)
    socketTimeoutMS: 30000,  // Tiempo de espera para operaciones (30 segundos)
  });

  try {
    // Conecta el cliente a MongoDB
    await client.connect();
    console.log('Conectado a MongoDB Atlas');

    // Envía un ping para verificar la conexión
    await client.db('admin').command({ ping: 1 });
    console.log('Ping a MongoDB exitoso');

    // Guarda la referencia a la base de datos en app.locals
    const db = client.db('Intelecto'); // Cambia el nombre de la base de datos si es necesario
    app.locals.db = db;

    return client; // Retorna el cliente conectado
  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
    process.exit(1); // Sale del proceso si hay un error crítico
  }
}

// Llamada a la función para conectar a la base de datos y luego iniciar el servidor
connectToDatabase().then((client) => {
  // Inicia el servidor solo después de conectar a la base de datos
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
  });

  // Maneja el cierre del cliente de MongoDB cuando el proceso termina
  process.on('SIGINT', async () => {
    console.log('Cerrando conexión a MongoDB...');
    await client.close();
    console.log('Conexión a MongoDB cerrada');
    process.exit(0);
  });
});
