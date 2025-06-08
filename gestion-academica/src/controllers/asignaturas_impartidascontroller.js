const model = require('../models/asignaturas_impartidas');

exports.getAll = (req, res) => {
  model.getAllAsignaturasImpartidas((err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener asignaturas impartidas' });
    res.json(data);
  });
};

exports.getById = (req, res) => {
  model.getAsignaturaImpartidaById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener asignatura impartida' });
    if (!data) return res.status(404).json({ error: 'No encontrada' });
    res.json(data);
  });
};

exports.create = (req, res) => {
  model.createAsignaturaImpartida(req.body, (err, id) => {
    if (err) return res.status(500).json({ error: 'Error al crear asignatura impartida' });
    res.json({ id });
  });
};

exports.update = (req, res) => {
  model.updateAsignaturaImpartida(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar asignatura impartida' });
    res.sendStatus(204);
  });
};

exports.delete = (req, res) => {
  model.deleteAsignaturaImpartida(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar asignatura impartida' });
    res.sendStatus(204);
  });
};