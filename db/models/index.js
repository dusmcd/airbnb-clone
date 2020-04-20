const User = require('./user');
const Listing = require('./listing');
const Reservation = require('./reservation');
const State = require('./state');

User.hasMany(Reservation);
Listing.hasMany(Reservation);
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
