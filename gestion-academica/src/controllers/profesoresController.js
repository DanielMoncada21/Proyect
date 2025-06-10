const db = require('../db');

// Obtener todos los profesores
exports.getProfesores = (req, res) => {
  db.query('SELECT * FROM profesores', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener profesores' });
    res.json(results);
  });
};

// Obtener profesor por ID
exports.getProfesorById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM profesores WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el profesor' });
    if (results.length === 0) return res.status(404).json({ error: 'Profesor no encontrado' });
    res.json(results[0]);
  });
};

// Crear nuevo profesor
exports.createProfesor = (req, res) => {
  const { nombre, correo } = req.body;
  db.query('INSERT INTO profesores (nombre, correo) VALUES (?, ?)', [nombre, correo], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al crear el profesor' });
    res.status(201).json({ id: results.insertId, nombre, correo });
  });
};

// Actualizar profesor
exports.updateProfesor = (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  db.query('UPDATE profesores SET nombre = ?, correo = ? WHERE id = ?', [nombre, correo, id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el profesor' });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Profesor no encontrado' });
    res.json({ id, nombre, correo });
  });
};

// Eliminar profesor
exports.deleteProfesor = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM profesores WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el profesor' });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Profesor no encontrado' });
    res.status(204).send();
  });
};
