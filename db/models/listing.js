const { db } = require('../db');
const Sequelize = require('sequelize');

const Listing = db.define('listing', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.00
    }
});

module.exports = Listing;
