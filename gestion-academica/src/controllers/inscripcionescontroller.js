const Inscripciones = require('../models/inscripciones');
const Estudiantes = require('../models/estudiantesmodels');
const Asignaturas = require('../models/asignaturasmodels');
const AsignaturasImpartidas = require('../models/asignaturas_impartidas');
const Profesores = require('../models/profesoresmodels');

// Obtener todas las inscripciones
const obtenerTodas = async (req, res) => {
  try {
    const inscripciones = await Inscripciones.findAll({
      include: {
        model: Estudiantes,
        attributes: ['nombre']
      }
    });
    res.json(inscripciones);
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener inscripción por ID
const obtenerPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const inscripcion = await Inscripciones.findByPk(id, {
      include: {
        model: Estudiantes,
        attributes: ['nombre']
      }
    });

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

// Crear nueva inscripción
const crear = async (req, res) => {
  try {
    const nuevaInscripcion = await Inscripciones.create(req.body);
    res.status(201).json(nuevaInscripcion);
  } catch (error) {
    console.error('Error al crear la inscripción:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar inscripción
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

// Eliminar inscripción
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

// ✅ NUEVO: Obtener asignaturas y notas por estudiante
const obtenerAsignaturasYNotasPorEstudiante = async (req, res) => {
  try {
    const idEstudiante = req.params.id;

    const inscripciones = await Inscripciones.findAll({
      where: { estudiante_id: idEstudiante },
      include: [{
        model: AsignaturasImpartidas,
        include: [
          { model: Asignaturas, attributes: ['nombre'] },
          { model: Profesores, attributes: ['nombre'] }
        ]
      }]
    });

    const resultado = inscripciones.map(ins => ({
      asignatura: ins.AsignaturasImpartida?.Asignatura?.nombre || 'sin asignatura',
      grupo: ins.AsignaturasImpartida?.grupo || 'N/A',
      profesor: ins.AsignaturasImpartida?.Profesore?.nombre || 'sin profesor',
      notas: {
        corte1: ins.n1,
        corte2: ins.n2,
        corte3: ins.n3
      }
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener asignaturas del estudiante:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  obtenerAsignaturasYNotasPorEstudiante 
};
