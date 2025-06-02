require('dotenv').config();
const express = require('express');
const estudiantesRoutes = require('./routes/estudiantes');
const asignaturasRoutes = require('./routes/asignaturas');
const profesoresRoutes = require('./routes/profesores');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/asignaturas', asignaturasRoutes);
app.use('/api/profesores', profesoresRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});