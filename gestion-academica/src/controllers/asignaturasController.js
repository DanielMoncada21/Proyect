const Asignaturas = require('../models/asignaturasmodels');
const AsignaturasImpartidas = require('../models/asignaturas_impartidas');
const Profesores = require('../models/profesoresmodels');

// Obtener todas las asignaturas
const obtenerTodasLasAsignaturas = async (req, res) => {
  try {
    const asignaturas = await Asignaturas.findAll();
    res.json(asignaturas);
  } catch (error) {
    console.error('Error al obtener las asignaturas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener asignatura por ID
const obtenerAsignaturaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const asignatura = await Asignaturas.findByPk(id);

    if (asignatura) {
      res.json(asignatura);
    } else {
      res.status(404).json({ error: 'Asignatura no encontrada' });
    }
  } catch (error) {
    console.error('Error al buscar la asignatura:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Crear una nueva asignatura
const crearAsignatura = async (req, res) => {
  try {
    const { nombre, creditos } = req.body;

    if (!nombre || creditos == null) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const nuevaAsignatura = await Asignaturas.create({ nombre, creditos });
    res.status(201).json(nuevaAsignatura);
  } catch (error) {
    console.error('Error al crear la asignatura:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Modificar asignatura
const modificarAsignatura = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, creditos } = req.body;

    const asignatura = await Asignaturas.findByPk(id);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }

    asignatura.nombre = nombre;
    asignatura.creditos = creditos;
    await asignatura.save();

    res.json({ mensaje: 'Asignatura actualizada correctamente', asignatura });
  } catch (error) {
    console.error('Error al actualizar la asignatura:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Eliminar asignatura
const eliminarAsignatura = async (req, res) => {
  try {
    const id = req.params.id;
    const asignatura = await Asignaturas.findByPk(id);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }

    await asignatura.destroy();
    res.json({ mensaje: 'Asignatura eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la asignatura:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener profesores que imparten una asignatura
const obtenerProfesoresPorAsignatura = async (req, res) => {
  try {
    const id = req.params.id;

    const asignaturas = await AsignaturasImpartidas.findAll({
      where: { asignaturas_id: id },
      include: [Profesores]
    });

    res.json({ AsignaturasImpartidas: asignaturas });
  } catch (error) {
    console.error('Error al obtener profesores por asignatura:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  obtenerTodasLasAsignaturas,
  obtenerAsignaturaPorId,
  crearAsignatura,
  modificarAsignatura,
  eliminarAsignatura,
  obtenerProfesoresPorAsignatura 
};
