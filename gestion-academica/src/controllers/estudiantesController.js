const db = require('../db');

exports.getAll = (req, res) => {
    db.query('SELECT * FROM estudiantes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;  
    db.query('SELECT * FROM estudiantes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
        res.json(results[0]);
    });
};

exports.create = (req, res) => {
    const { nombre, apellido, edad } = req.body;
    db.query('INSERT INTO estudiantes (nombre, apellido, edad) VALUES (?, ?, ?)', [nombre, apellido, edad], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, nombre, apellido, edad });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad } = req.body;
    db.query('UPDATE estudiantes SET nombre = ?, apellido = ?, edad = ? WHERE id = ?', [nombre, apellido, edad, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
        res.json({ message: 'Estudiante actualizado' });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM estudiantes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
        res.json({ message: 'Estudiante eliminado' });
    });
};
