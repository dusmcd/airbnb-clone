const db = require('../db');
const Sequelize = require('sequelize');
const encryptText = require('../../helpers/encrypt');
const crypto = require('crypto');

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    salt: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    }
});

User.beforeCreate(user => {
    const salt = crypto.randomBytes(32).toString('hex');
    user.salt = salt;
    user.password = encryptText(user.password, salt);
});

User.prototype.validatePassword = function(givenPassword) {
    const encryptedPassword = encryptText(givenPassword, this.salt);
    if (encryptedPassword === givenPassword) {
        return true;
    }
    return false;
};

module.exports = User;