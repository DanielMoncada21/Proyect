const model = require('../models/asignaturas_impartidas');

exports.getAll = async (req, res) => {
  const data = await model.getAllAsignaturasImpartidas();
  res.json(data);
};

exports.create = async (req, res) => {
  const id = await model.createAsignaturaImpartida(req.body);
  res.json({ id });
};
