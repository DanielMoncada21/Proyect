const db = require('../db'); 

// Obtener todas las asignaturas impartidas
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM asignaturas_impartidas';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener asignaturas impartidas' });
    res.json(results);
  });
};

// Obtener una asignatura impartida por ID
exports.getById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM asignaturas_impartidas WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener la asignatura impartida' });
    if (results.length === 0) return res.status(404).json({ error: 'No encontrada' });
    res.json(results[0]);
  });
};

// Crear una nueva asignatura impartida
exports.create = (req, res) => {
  const { profesor_id, asignaturas_id, grupo, horario } = req.body;
  const sql = `
    INSERT INTO asignaturas_impartidas (profesor_id, asignaturas_id, grupo, horario)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [profesor_id, asignaturas_id, grupo, horario], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear la asignatura impartida', detalle: err.message });
    res.status(201).json({ id: result.insertId, profesor_id, asignaturas_id, grupo, horario });
  });
};

// Actualizar una asignatura impartida
exports.update = (req, res) => {
  const { id } = req.params;
  const { profesor_id, asignaturas_id, grupo, horario } = req.body;
  const sql = `
    UPDATE asignaturas_impartidas
    SET profesor_id = ?, asignaturas_id = ?, grupo = ?, horario = ?
    WHERE id = ?
  `;
  db.query(sql, [profesor_id, asignaturas_id, grupo, horario, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar la asignatura impartida', detalle: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrada' });
    res.json({ message: 'Asignatura impartida actualizada' });
  });
};

// Eliminar una asignatura impartida
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM asignaturas_impartidas WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar la asignatura impartida' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrada' });
    res.status(204).send();
  });
};

