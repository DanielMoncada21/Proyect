const express = require('express');
const router = express.Router();
const asignaturasController = require('../controllers/asignaturasController');

// Obtener todas las asignaturas
router.get('/', asignaturasController.obtenerTodasLasAsignaturas);

// Obtener una asignatura por ID
router.get('/:id', asignaturasController.obtenerAsignaturaPorId);

// Crear una nueva asignatura
router.post('/', asignaturasController.crearAsignatura);

// Modificar una asignatura existente
router.put('/:id', asignaturasController.modificarAsignatura);

// Eliminar una asignatura
router.delete('/:id', asignaturasController.eliminarAsignatura);

// Obtener los profesores que dictan una asignatura
router.get('/:id/profesores', asignaturasController.obtenerProfesoresPorAsignatura);

module.exports = router;

