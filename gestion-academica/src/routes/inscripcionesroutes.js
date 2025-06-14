const express = require('express');
const router = express.Router();
const inscripcionesController = require('../controllers/inscripcionesController');

router.get('/estudiante/:id', inscripcionesController.obtenerAsignaturasYNotasPorEstudiante);
router.get('/', inscripcionesController.obtenerTodas);
router.get('/:id', inscripcionesController.obtenerPorId);
router.post('/', inscripcionesController.crear);
router.put('/:id', inscripcionesController.actualizar);
router.delete('/:id', inscripcionesController.eliminar);

module.exports = router;

