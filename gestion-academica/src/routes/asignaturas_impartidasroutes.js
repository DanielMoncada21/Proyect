const express = require('express');
const router = express.Router();
const asignaturasImpartidasController = require('../controllers/asignaturas_impartidascontroller');

// Obtener todas las asignaturas impartidas
router.get('/', asignaturasImpartidasController.obtenerTodas);

// Obtener una asignatura impartida por ID
router.get('/:id', asignaturasImpartidasController.obtenerPorId);

// Crear una nueva asignatura impartida
router.post('/', asignaturasImpartidasController.crear);

// Actualizar una asignatura impartida existente
router.put('/:id', asignaturasImpartidasController.actualizar);

// Eliminar una asignatura impartida
router.delete('/:id', asignaturasImpartidasController.eliminar);

module.exports = router;
