const db = require('../db');
const Sequelize = require('sequelize');

const Listing = db.define('listing', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT
    },
    imagePublicId: {
        type: Sequelize.STRING,
        defaultValue: 'lighted-beige-house-1396132_urqgou'
    },
    price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.00
    }
});

module.exports = Listing;
