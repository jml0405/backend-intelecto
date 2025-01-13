require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { MongoClient } = require('mongodb'); // Importa MongoClient
const userRoutes = require('./server/routes/userRoutes'); // Importa las rutas de usuarios

// Obtiene la URI de MongoDB y el puerto desde las variables de entorno
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Inicializa la aplicación Express
const app = express();

// Middleware para manejar JSON
app.use(express.json());

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

// Usar Swagger UI para exponer la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Función para conectar a MongoDB
async function connectToDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Conectado a MongoDB Atlas');
    
    // Puedes guardar la referencia de la base de datos en app.locals
    const db = client.db('intelecto'); // Cambia el nombre de la base de datos si es necesario
    app.locals.db = db; // Guarda la conexión en app.locals para usarla en las rutas
  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
    process.exit(1); // Sale del proceso si hay un error crítico
  }
}

// Llamada a la función para conectar a la base de datos
connectToDatabase().then(() => {
  // Iniciar el servidor solo después de conectar a la base de datos
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
  });
});
