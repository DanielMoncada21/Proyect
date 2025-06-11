require('dotenv').config();
const cors = require('cors');
const express = require('express');
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const asignaturasRoutes = require('./routes/asignaturasRoutes');
const profesoresRoutes = require('./routes/profesoresRoutes');
const asignaturas_impartidasRoutes = require('./routes/asignaturas_impartidasroutes');
const inscripcionesRoutes = require('./routes/inscripcionesRoutes');

const app = express();
const PORT = process.env.PORT ;


app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/asignaturas', asignaturasRoutes);
app.use('/api/profesores', profesoresRoutes);
app.use('/api/asignaturas_impartidas', asignaturas_impartidasRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
