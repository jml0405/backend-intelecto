const { poolPromise, sql } = require('../config/db');

// Función para obtener todos los usuarios
const getUsers = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('sp_GetUsers'); // Llama al procedimiento almacenado
    return result.recordset; // Devuelve los registros obtenidos
  } catch (err) {
    console.error('Error al obtener usuarios en el modelo:', err);
    throw err;
  }
};

// Función para crear un nuevo usuario
const createUser = async (name, email, password) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Name', sql.NVarChar, name)
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.NVarChar, password)
      .execute('sp_InsertUser'); // Llama al procedimiento almacenado
    return result.recordset[0].NewUserId; // Devuelve el ID del nuevo usuario
  } catch (err) {
    console.error('Error al crear usuario en el modelo:', err);
    throw err;
  }
};

module.exports = {
  getUsers,
  createUser,
};
