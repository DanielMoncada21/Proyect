require('dotenv').config();
const cors = require('cors');
const sequelize = require('./db');
const express = require('express');
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const asignaturasRoutes = require('./routes/asignaturasRoutes');
const profesoresRoutes = require('./routes/profesoresRoutes');
const asignaturas_impartidasRoutes = require('./routes/asignaturas_impartidasroutes');
const inscripcionesRoutes = require('./routes/inscripcionesRoutes');

const app = express();
const PORT = process.env.PORT ;


app.use(cors());

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

sequelize.authenticate()
  .then(() => console.log('✅ Conexión establecida con MySQL'))
  .catch(err => console.error(' Error de conexión:', err));