const { db } = require('../db');
const Sequelize = require('sequelize');

const Reservation = db.define('reservation', {
    startDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    pricePaid: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.00
    }
});

module.exports = Reservation;
