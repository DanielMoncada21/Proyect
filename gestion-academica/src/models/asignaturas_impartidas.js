const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Profesores = require('./profesoresmodels');
const Asignaturas = require('./asignaturasmodels');

const AsignaturasImpartidas = sequelize.define('AsignaturasImpartidas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  profesor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Profesores,
      key: 'id'
    }
  },
  asignaturas_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Asignaturas,
      key: 'id'
    }
  },
  grupo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'asignaturas_impartidas',
  timestamps: false
});

// Relaciones
Profesores.hasMany(AsignaturasImpartidas, { foreignKey: 'profesor_id' });
AsignaturasImpartidas.belongsTo(Profesores, { foreignKey: 'profesor_id' });

Asignaturas.hasMany(AsignaturasImpartidas, { foreignKey: 'asignaturas_id' });
AsignaturasImpartidas.belongsTo(Asignaturas, { foreignKey: 'asignaturas_id' });

module.exports = AsignaturasImpartidas;
