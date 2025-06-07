require('dotenv').config();
const express = require('express');
const estudiantesRoutes = require('./routes/estudiantes');
const asignaturasRoutes = require('./routes/asignaturas');
const profesoresRoutes = require('./routes/profesores');
const asignaturas_impartidasRoutes = require('./routes/asignaturas_impartidasroutes');
const inscripcionesRoutes = require('./routes/inscripcionesroutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/asignaturas', asignaturasRoutes);
app.use('/api/profesores', profesoresRoutes);
app.use('/api/asignaturas-impartidas', asignaturas_impartidasRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});