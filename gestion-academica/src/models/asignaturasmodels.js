const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Asignaturas = sequelize.define('Asignaturas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creditos: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'asignaturas',
  timestamps: false
});

module.exports = Asignaturas;