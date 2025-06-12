const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');

// Obtener todos los estudiantes
router.get('/', estudiantesController.obtenerTodos);

// Obtener un estudiante por ID
router.get('/:id', estudiantesController.obtenerPorId);

// Crear un nuevo estudiante
router.post('/', estudiantesController.crear);

// Actualizar un estudiante
router.put('/:id', estudiantesController.actualizar);

// Eliminar un estudiante
router.delete('/:id', estudiantesController.eliminar);

module.exports = router;
