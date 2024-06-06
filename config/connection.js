const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
  }
);

module.exports = sequelize;
