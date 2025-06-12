const Inscripciones = require('../models/inscripciones');

const obtenerTodas = async (req, res) => {
  try {
    const inscripciones = await Inscripciones.findAll();
    res.json(inscripciones);
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const inscripcion = await Inscripciones.findByPk(id);

    if (inscripcion) {
      res.json(inscripcion);
    } else {
      res.status(404).json({ error: 'Inscripción no encontrada' });
    }
  } catch (error) {
    console.error('Error al buscar la inscripción:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const crear = async (req, res) => {
  try {
    const nuevaInscripcion = await Inscripciones.create(req.body);
    res.status(201).json(nuevaInscripcion);
  } catch (error) {
    console.error('Error al crear la inscripción:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const actualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const inscripcion = await Inscripciones.findByPk(id);

    if (!inscripcion) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }

    await inscripcion.update(req.body);
    res.json(inscripcion);
  } catch (error) {
    console.error('Error al actualizar la inscripción:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const eliminar = async (req, res) => {
  try {
    const id = req.params.id;
    const inscripcion = await Inscripciones.findByPk(id);

    if (!inscripcion) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }

    await inscripcion.destroy();
    res.json({ mensaje: 'Inscripción eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la inscripción:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};
