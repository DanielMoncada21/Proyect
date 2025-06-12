const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nombre de la base de datos
  process.env.DB_USER,     // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST, // Host (localhost, etc.)
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // opcional: desactiva logs de SQL en consola
  }
);

module.exports = sequelize;
