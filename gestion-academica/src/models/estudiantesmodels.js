const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Estudiantes = sequelize.define('Estudiantes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'estudiantes',
  timestamps: false
});

module.exports = Estudiantes;
