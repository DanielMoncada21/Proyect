const model = require('../models/inscripciones');

exports.getAll = (req, res) => {
  model.getAllInscripciones((err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener inscripciones' });
    res.json(data);
  });
};

exports.getById = (req, res) => {
  model.getInscripcionById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener inscripción' });
    if (!data) return res.status(404).json({ error: 'No encontrada' });
    res.json(data);
  });
};

exports.create = (req, res) => {
  model.createInscripcion(req.body, (err, id) => {
    if (err) return res.status(500).json({ error: 'Error al crear inscripción' });
    res.json({ id });
  });
};

exports.update = (req, res) => {
  model.updateInscripcion(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar inscripción' });
    res.sendStatus(204);
  });
};

exports.delete = (req, res) => {
  model.deleteInscripcion(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar inscripción' });
    res.sendStatus(204);
  });
};