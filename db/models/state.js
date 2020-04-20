const db = require('../db');
const Sequelize = require('sequelize');

const State = db.define('state', {
    abbreviation: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUppercase: true,
            notEmpty: true
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

module.exports = State;
