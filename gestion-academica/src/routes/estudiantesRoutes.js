    const express = require('express');
    const router = express.Router();
    const controller = require('../controllers/estudiantesController');

    // Crear un nuevo estudiante
    router.post('/', controller.create);

    // Obtener todos los estudiantes
    router.get('/', controller.getAll);

    // Obtener un estudiante por ID
    router.get('/:id', controller.getById);

    // Actualizar un estudiante por ID
    router.put('/:id', controller.update);

    // Eliminar un estudiante por ID
    router.delete('/:id', controller.delete);

    module.exports = router;