const User = require('./user');
const Listing = require('./listing');
const Reservation = require('./reservation');

User.hasMany(Reservation);
Listing.hasMany(Reservation);

module.exports = {
    User,
    Listing,
    Reservation
};
