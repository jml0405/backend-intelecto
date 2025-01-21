require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose'); // Usamos Mongoose para la conexión
const userRoutes = require('./server/routes/userRoutes');
const bookRoutes = require('./server/routes/bookRoutes');
const genreRoutes = require('./server/routes/genreRoutes');
const authRoutes = require('./server/routes/authRoutes');
const estadoLibroRoutes = require('./server/routes/estadoLibroRoutes');
const metodoPagoRoutes = require('./server/routes/metodoPagoRoutes');
const estadoPrestamoRoutes = require('./server/routes/loanStatusRoutes');
const ratingRoutes = require('./server/routes/ratingRoutes');
const reservationRoutes = require('./server/routes/reservationRoutes');
const forumRoutes = require('./server/routes/forumRoutes');
const responseRoutes = require('./server/routes/responseRoutes');
const loanRoutes = require('./server/routes/loanRoutes');
const generoLibroRoutes = require('./server/routes/generoLibroRoutes');
const estadoLibroAsociadoRoutes = require('./server/routes/estadoLibroAsociadoRoutes');
const generoForoRoutes = require('./server/routes/generoForoRoutes');

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
        url: `http://localhost:${PORT}`,
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
app.use('/api', estadoLibroRoutes);
app.use('/api', metodoPagoRoutes);
app.use('/api', estadoPrestamoRoutes);
app.use('/api', ratingRoutes);
app.use('/api', reservationRoutes);
app.use('/api', forumRoutes);
app.use('/api', responseRoutes);
app.use('/api', loanRoutes);
app.use('/api', generoLibroRoutes);
app.use('/api', estadoLibroAsociadoRoutes);
app.use('/api', generoForoRoutes);

// Usar Swagger UI para exponer la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexión a MongoDB con Mongoose
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Ajusta el tiempo de espera
    });
    console.log('Conectado a MongoDB con Mongoose');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Sale del proceso si hay un error crítico
  }
}

// Llama a la función para conectar a la base de datos y luego iniciar el servidor
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
  });
});
