const db = require('../db');

async function getAllInscripciones() {
  const [rows] = await db.query('SELECT * FROM inscripciones');
  return rows;
}

async function createInscripcion(data) {
  const { estudiante_id, asignatura_impartida_id, n1, n2, n3 } = data;
  const [result] = await db.execute(
    'INSERT INTO inscripciones (estudiante_id, asignatura_impartida_id, n1, n2, n3) VALUES (?, ?, ?, ?, ?)',
    [estudiante_id, asignatura_impartida_id, n1, n2, n3]
  );
  return result.insertId;
}

module.exports = {
  getAllInscripciones,
  createInscripcion
};