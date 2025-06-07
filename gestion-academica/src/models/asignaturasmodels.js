const db = require('../db');

// Obtener todas las asignaturas
async function getAllAsignaturas() {
  const [rows] = await db.query('SELECT * FROM asignaturas');
  return rows;
}

// Obtener una asignatura por ID
async function getAsignaturaById(id) {
  const [rows] = await db.query('SELECT * FROM asignaturas WHERE id = ?', [id]);
  return rows[0];
}

// Crear una nueva asignatura
async function createAsignatura(data) {
  const { nombre, codigo } = data;
  const [result] = await db.query(
    'INSERT INTO asignaturas (nombre, codigo) VALUES (?, ?)',
    [nombre, codigo]
  );
  return result.insertId;
}

// Actualizar una asignatura
async function updateAsignatura(id, data) {
  const { nombre, codigo } = data;
  await db.query(
    'UPDATE asignaturas SET nombre = ?, codigo = ? WHERE id = ?',
    [nombre, codigo, id]
  );
}

// Eliminar una asignatura
async function deleteAsignatura(id) {
  await db.query('DELETE FROM asignaturas WHERE id = ?', [id]);
}

module.exports = {
  getAllAsignaturas,
  getAsignaturaById,
  createAsignatura,
  updateAsignatura,
  deleteAsignatura
};
