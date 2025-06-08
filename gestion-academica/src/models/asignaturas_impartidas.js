const db = require('../db');

// Obtener todas las asignaturas impartidas
function getAllAsignaturasImpartidas(callback) {
  db.query('SELECT * FROM asignaturas_impartidas', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}

// Obtener una asignatura impartida por ID
function getAsignaturaImpartidaById(id, callback) {
  db.query('SELECT * FROM asignaturas_impartidas WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
}

// Crear una nueva asignatura impartida
function createAsignaturaImpartida(data, callback) {
  const asignatura = {
    profesor_id: data.profesor_id,
    asignaturas_id: data.asignaturas_id,
    grupo: data.grupo,
    horario: data.horario
  };
  db.query('INSERT INTO asignaturas_impartidas SET ?', asignatura, (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId);
  });
}

// Actualizar una asignatura impartida
function updateAsignaturaImpartida(id, data, callback) {
  const asignatura = {
    profesor_id: data.profesor_id,
    asignaturas_id: data.asignaturas_id,
    grupo: data.grupo,
    horario: data.horario
  };
  db.query(
    'UPDATE asignaturas_impartidas SET ? WHERE id = ?',
    [asignatura, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null);
    }
  );
}

// Eliminar una asignatura impartida
function deleteAsignaturaImpartida(id, callback) {
  db.query('DELETE FROM asignaturas_impartidas WHERE id = ?', [id], (err, result) => {
    if (err) return callback(err);
    callback(null);
  });
}

module.exports = {
  getAllAsignaturasImpartidas,
  getAsignaturaImpartidaById,
  createAsignaturaImpartida,
  updateAsignaturaImpartida,
  deleteAsignaturaImpartida
};