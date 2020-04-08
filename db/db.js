const Sequelize = require('sequelize');

const db = new Sequelize('airbnb_clone', 'root', process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

module.exports = db;