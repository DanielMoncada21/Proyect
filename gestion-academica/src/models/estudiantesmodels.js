const db = require('../db');

// Obtener todos los estudiantes
async function getAllEstudiantes() {
  const [rows] = await db.query('SELECT * FROM estudiantes');
  return rows;
}

// Obtener un estudiante por ID
async function getEstudianteById(id) {
  const [rows] = await db.query('SELECT * FROM estudiantes WHERE id = ?', [id]);
  return rows[0];
}

// Crear un nuevo estudiante
async function createEstudiante(data) {
  const { nombre, correo } = data;
  const [result] = await db.query(
    'INSERT INTO estudiantes (nombre, correo) VALUES (?, ?)',
    [nombre, correo]
  );
  return result.insertId;
}

// Actualizar un estudiante
async function updateEstudiante(id, data) {
  const { nombre, correo } = data;
  await db.query(
    'UPDATE estudiantes SET nombre = ?, correo = ? WHERE id = ?',
    [nombre, correo, id]
  );
}

// Eliminar un estudiante
async function deleteEstudiante(id) {
  await db.query('DELETE FROM estudiantes WHERE id = ?', [id]);
}

module.exports = {
  getAllEstudiantes,
  getEstudianteById,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante
};