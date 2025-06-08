const db = require('../db');

// Obtener todas las inscripciones
function getAllInscripciones(callback) {
  db.query('SELECT * FROM inscripciones', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}

// Obtener una inscripción por ID
function getInscripcionById(id, callback) {
  db.query('SELECT * FROM inscripciones WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
}

// Crear una nueva inscripción
function createInscripcion(data, callback) {
  const { estudiante_id, asignatura_impartida_id, n1, n2, n3 } = data;
  db.query(
    'INSERT INTO inscripciones (estudiante_id, asignatura_impartida_id, n1, n2, n3) VALUES (?, ?, ?, ?, ?)',
    [estudiante_id, asignatura_impartida_id, n1, n2, n3],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    }
  );
}

// Actualizar una inscripción
function updateInscripcion(id, data, callback) {
  const { estudiante_id, asignatura_impartida_id, n1, n2, n3 } = data;
  db.query(
    'UPDATE inscripciones SET estudiante_id = ?, asignatura_impartida_id = ?, n1 = ?, n2 = ?, n3 = ? WHERE id = ?',
    [estudiante_id, asignatura_impartida_id, n1, n2, n3, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null);
    }
  );
}

// Eliminar una inscripción
function deleteInscripcion(id, callback) {
  db.query('DELETE FROM inscripciones WHERE id = ?', [id], (err, result) => {
    if (err) return callback(err);
    callback(null);
  });
}

module.exports = {
  getAllInscripciones,
  getInscripcionById,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion
};