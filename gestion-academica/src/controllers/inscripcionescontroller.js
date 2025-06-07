const model = require('../models/inscripciones');

exports.getAll = async (req, res) => {
  const data = await model.getAllInscripciones();
  res.json(data);
};

exports.create = async (req, res) => {
  const id = await model.createInscripcion(req.body);
  res.json({ id });
};
