require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Ajusta la ruta si es necesario
const { MongoClient } = require('mongodb'); // Importa MongoClient

// Obtiene la URI de MongoDB y el puerto desde las variables de entorno
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Inicializa la aplicación Express
const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Configuración de conexión a MongoDB
async function connectToDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Conectado a MongoDB Atlas');

        // Opcional: Puedes asignar la base de datos a una variable global o pasarla a tus rutas
        const db = client.db('intelecto'); // Cambia 'nombre_base_datos' al nombre de tu base de datos
        app.locals.db = db; // Guarda la conexión en app.locals para usarla en las rutas
    } catch (error) {
        console.error('Error al conectar a MongoDB Atlas:', error);
        process.exit(1); // Sale del proceso si hay un error crítico
    }
}

// Llama a la función para conectar a la base de datos
connectToDatabase();

// Rutas de la API
app.use('/api', require('./server/routes/userRoutes')); // Ajusta esta ruta según tu estructura de carpetas

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});
