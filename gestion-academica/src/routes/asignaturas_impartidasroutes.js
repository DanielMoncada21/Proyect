const express = require('express');
const router = express.Router();
const controller = require('../controllers/asignaturas_impartidasController');

// Obtener todas las asignaturas impartidas
router.get('/', controller.getAll);

// Crear una nueva asignatura impartida
router.post('/', controller.create);

// Actualizar una asignatura impartida por ID
router.put('/:id', controller.update);

// Eliminar una asignatura impartida por ID
router.delete('/:id', controller.delete);

module.exports = router;
