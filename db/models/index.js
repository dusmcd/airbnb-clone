const User = require('./user');
const Listing = require('./listing');
const Reservation = require('./reservation');
const State = require('./state');

// data associations
User.hasMany(Reservation);
Listing.hasMany(Reservation);
Reservation.belongsTo(Listing);
User.hasMany(Listing);
Listing.belongsTo(User);
State.hasOne(Listing);
Listing.belongsTo(State);

module.exports = {
    User,
    Listing,
    Reservation,
    State
};
