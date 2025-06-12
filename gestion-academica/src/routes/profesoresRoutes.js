const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

// Obtener todos los profesores
router.get('/', profesoresController.obtenerProfesores);

// Obtener un profesor por ID
router.get('/:id', profesoresController.obtenerProfesorPorId);

// Crear un nuevo profesor
router.post('/', profesoresController.crearProfesor);

// Actualizar un profesor por ID
router.put('/:id', profesoresController.actualizarProfesor);

// Eliminar un profesor por ID
router.delete('/:id', profesoresController.eliminarProfesor);

module.exports = router;
