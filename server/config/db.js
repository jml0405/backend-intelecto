const sql = require('mssql');
require('dotenv').config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: true, // Usar en Azure
    trustServerCertificate: true, // Para entornos locales
  },
};

const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then((pool) => {
    console.log('Conexión a SQL Server exitosa');
    return pool;
  })
  .catch((err) => {
    console.error('Error al conectar a SQL Server:', err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
