const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Profesores = sequelize.define('Profesores', {
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
  tableName: 'profesores',
  timestamps: false
});

module.exports = Profesores;
