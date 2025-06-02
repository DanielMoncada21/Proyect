const db = require('../db');

// Obtener todos los profesores
async function getAllProfesores() {
  const [rows] = await db.query('SELECT * FROM profesores');
  return rows;
}

// Obtener un profesor por ID
async function getProfesorById(id) {
  const [rows] = await db.query('SELECT * FROM profesores WHERE id = ?', [id]);
  return rows[0];
}

// Crear un nuevo profesor
async function createProfesor(data) {
  const { nombre, correo } = data;
  const [result] = await db.query(
    'INSERT INTO profesores (nombre, correo) VALUES (?, ?)',
    [nombre, correo]
  );
  return result.insertId;
}

// Actualizar un profesor
async function updateProfesor(id, data) {
  const { nombre, correo } = data;
  await db.query(
    'UPDATE profesores SET nombre = ?, correo = ? WHERE id = ?',
    [nombre, correo, id]
  );
}

// Eliminar un profesor
async function deleteProfesor(id) {
  await db.query('DELETE FROM profesores WHERE id = ?', [id]);
}

module.exports = {
  getAllProfesores,
  getProfesorById,
  createProfesor,
  updateProfesor,
  deleteProfesor
};