const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Estudiantes = require('./estudiantesmodels');
const AsignaturasImpartidas = require('./asignaturas_impartidas');

const Inscripciones = sequelize.define('Inscripciones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  estudiante_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Estudiantes,
      key: 'id'
    }
  },
  asignatura_impartida_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AsignaturasImpartidas,
      key: 'id'
    }
  },
  n1: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  n2: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  n3: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'inscripciones',
  timestamps: false
});

// Relaciones
Estudiantes.hasMany(Inscripciones, { foreignKey: 'estudiante_id' });
Inscripciones.belongsTo(Estudiantes, { foreignKey: 'estudiante_id' });

AsignaturasImpartidas.hasMany(Inscripciones, { foreignKey: 'asignatura_impartida_id' });
Inscripciones.belongsTo(AsignaturasImpartidas, { foreignKey: 'asignatura_impartida_id' });

module.exports = Inscripciones;
