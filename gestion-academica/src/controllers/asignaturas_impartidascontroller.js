const AsignaturasImpartidas = require('../models/asignaturas_impartidas');

// Obtener todas
const obtenerTodas = async (req, res) => {
  try {
    const lista = await AsignaturasImpartidas.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener asignaturas impartidas' });
  }
};

// Obtener por ID
const obtenerPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const resultado = await AsignaturasImpartidas.findByPk(id);
    if (resultado) res.json(resultado);
    else res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Crear nueva
const crear = async (req, res) => {
  try {
    const nueva = await AsignaturasImpartidas.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
  console.error('Error al crear asignatura impartida:', error); // 👈 imprime el error en consola
  res.status(500).json({ error: error.message });               // 👈 envía el mensaje real
}
};

// Actualizar
const actualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await AsignaturasImpartidas.update(req.body, { where: { id } });
    if (updated) res.json({ mensaje: 'Actualizado correctamente' });
    else res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

// Eliminar
const eliminar = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await AsignaturasImpartidas.destroy({ where: { id } });
    if (eliminado) res.json({ mensaje: 'Eliminado correctamente' });
    else res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};

