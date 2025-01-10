require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // Ajusta la ruta si es necesario

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Rutas de API
app.use('/api', require('./routes/api'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}.`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});
