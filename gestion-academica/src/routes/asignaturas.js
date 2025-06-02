const express = require('express');
const router = express.Router();
const asignaturas = require('../models/asignaturasmodels');

// Obtener todas las asignaturas
router.get('/', async (req, res) => {
  const data = await asignaturas.getAllAsignaturas();
  res.json(data);
});

// Obtener una asignatura por ID
router.get('/:id', async (req, res) => {
  const data = await asignaturas.getAsignaturaById(req.params.id);
  res.json(data);
});

// Crear una nueva asignatura
router.post('/', async (req, res) => {
  const id = await asignaturas.createAsignatura(req.body);
  res.json({ id });
});

// Actualizar una asignatura
router.put('/:id', async (req, res) => {
  await asignaturas.updateAsignatura(req.params.id, req.body);
  res.sendStatus(204);
});

// Eliminar una asignatura
router.delete('/:id', async (req, res) => {
  await asignaturas.deleteAsignatura(req.params.id);
  res.sendStatus(204);
});

module.exports = router;