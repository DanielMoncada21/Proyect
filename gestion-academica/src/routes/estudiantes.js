const express = require('express');
const router = express.Router();
const estudiantesModel = require('../models/estudiantesmodels');

// Crear un nuevo estudiante
router.post('/', async (req, res) => {
  const id = await estudiantesModel.createEstudiante(req.body);
  res.json({ id });
});

// Obtener todos los estudiantes
router.get('/', async (req, res) => {
  const data = await estudiantesModel.getAllEstudiantes();
  res.json(data);
});

// Obtener un estudiante por ID
router.get('/:id', async (req, res) => {
  const data = await estudiantesModel.getEstudianteById(req.params.id);
  res.json(data);
});

// Actualizar un estudiante por ID
router.put('/:id', async (req, res) => {
  await estudiantesModel.updateEstudiante(req.params.id, req.body);
  res.sendStatus(204);
});

// Eliminar un estudiante por ID
router.delete('/:id', async (req, res) => {
  await estudiantesModel.deleteEstudiante(req.params.id);
  res.sendStatus(204);
});

module.exports = router;