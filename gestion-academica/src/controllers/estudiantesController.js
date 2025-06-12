const Estudiantes = require('../models/estudiantesmodels');

// Obtener todos los estudiantes
const obtenerTodos = async (req, res) => {
  try {
    const estudiantes = await Estudiantes.findAll();
    res.json(estudiantes);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener estudiante por ID
const obtenerPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const estudiante = await Estudiantes.findByPk(id);

    if (estudiante) {
      res.json(estudiante);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar estudiante:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Crear nuevo estudiante
const crear = async (req, res) => {
  try {
    const nuevoEstudiante = await Estudiantes.create(req.body);
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ error: 'Error al crear estudiante' });
  }
};

// Actualizar estudiante
const actualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Estudiantes.update(req.body, {
      where: { id }
    });

    if (updated) {
      res.json({ mensaje: 'Estudiante actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
};

// Eliminar estudiante
const eliminar = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await Estudiantes.destroy({
      where: { id }
    });

    if (eliminado) {
      res.json({ mensaje: 'Estudiante eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};
