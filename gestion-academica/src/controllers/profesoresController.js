const db = require('../db');

exports.getProfesores = (req, res) => {
    db.query('SELECT * FROM profesores', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving profesores' });
        }
        res.json(results);
    });
};

exports.getProfesorById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM profesores WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving profesor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Profesor not found' });
        }
        res.json(results[0]);
    });
};

exports.createProfesor = (req, res) => {
    const { nombre, apellido, asignatura } = req.body;
    db.query('INSERT INTO profesores (nombre, apellido, asignatura) VALUES (?, ?, ?)', [nombre, apellido, asignatura], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating profesor' });
        }
        res.status(201).json({ id: results.insertId, nombre, apellido, asignatura });
    });
};

exports.updateProfesor = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, asignatura } = req.body;
    db.query('UPDATE profesores SET nombre = ?, apellido = ?, asignatura = ? WHERE id = ?', [nombre, apellido, asignatura, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating profesor' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Profesor not found' });
        }
        res.json({ id, nombre, apellido, asignatura });
    });
};

exports.deleteProfesor = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM profesores WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting profesor' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Profesor not found' });
        }
        res.status(204).send();
    });
};