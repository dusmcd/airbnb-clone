const User = require('./user');
const Listing = require('./listing');
const Reservation = require('./reservation');

User.hasMany(Reservation);
Listing.hasMany(Reservation);
User.hasMany(Listing);

module.exports = {
    User,
    Listing,
    Reservation
};
