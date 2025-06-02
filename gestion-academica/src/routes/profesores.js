const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

// Ruta para obtener todos los profesores
router.get('/', profesoresController.getProfesores);

// Ruta para obtener un profesor por ID
router.get('/:id', profesoresController.getProfesorById);

// Ruta para crear un nuevo profesor
router.post('/', profesoresController.createProfesor);

// Ruta para actualizar un profesor existente
router.put('/:id', profesoresController.updateProfesor);

// Ruta para eliminar un profesor
router.delete('/:id', profesoresController.deleteProfesor);

module.exports = router;