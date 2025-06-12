const Profesores = require('../models/profesoresmodels');

// Obtener todos los profesores
const obtenerProfesores = async (req, res) => {
  try {
    const profesores = await Profesores.findAll();
    res.json(profesores);
  } catch (error) {
    console.error('Error al obtener profesores:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener un profesor por ID
const obtenerProfesorPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const profesor = await Profesores.findByPk(id);

    if (profesor) {
      res.json(profesor);
    } else {
      res.status(404).json({ error: 'Profesor no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar el profesor:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Crear un nuevo profesor
const crearProfesor = async (req, res) => {
  try {
    const { nombre, correo } = req.body;
    const nuevoProfesor = await Profesores.create({ nombre, correo });
    res.status(201).json(nuevoProfesor);
  } catch (error) {
    console.error('Error al crear el profesor:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar un profesor
const actualizarProfesor = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, correo } = req.body;

    const profesor = await Profesores.findByPk(id);
    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    profesor.nombre = nombre;
    profesor.correo = correo;

    await profesor.save();
    res.json(profesor);
  } catch (error) {
    console.error('Error al actualizar el profesor:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Eliminar un profesor
const eliminarProfesor = async (req, res) => {
  try {
    const id = req.params.id;
    const profesor = await Profesores.findByPk(id);

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    await profesor.destroy();
    res.json({ mensaje: 'Profesor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el profesor:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  obtenerProfesores,
  obtenerProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor
};
