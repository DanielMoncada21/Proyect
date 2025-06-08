const db = require('../db');

exports.getAll = (req, res) => {
    db.query('SELECT * FROM asignaturas', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener las asignaturas' });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM asignaturas WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener la asignatura' });
        if (results.length === 0) return res.status(404).json({ error: 'Asignatura no encontrada' });
        res.json(results[0]);
    });
};

exports.create = (req, res) => {
    const { nombre, creditos } = req.body;
    db.query('INSERT INTO asignaturas (nombre, creditos) VALUES (?, ?)', [nombre, creditos], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al crear la asignatura' });
        res.status(201).json({ id: results.insertId, nombre, creditos });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { nombre, creditos } = req.body;
    db.query('UPDATE asignaturas SET nombre = ?, creditos = ? WHERE id = ?', [nombre, creditos, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar la asignatura' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Asignatura no encontrada' });
        res.json({ id, nombre, creditos });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM asignaturas WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar la asignatura' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Asignatura no encontrada' });
        res.status(204).send();
    });
};