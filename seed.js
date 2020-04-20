require('./secrets');
const stateList = require('./states.seed');
const { db, Listing, Reservation, User, State } = require('./db');

(async function() {
    try {
        await db.sync({ force: true });
        const dustin = {
            username: 'dustin',
            email: 'dustin@email.com',
            password: '123'
        };
        const phil = {
            username: 'phil',
            email: 'phil@email.com',
            password: '123'
        };

        const statePromises = stateList.map(stateObj => {
            return State.create(stateObj);
        });

        const states = await Promise.all(statePromises);

        const users = await Promise.all([User.create(dustin), User.create(phil)]);

        users.forEach(async user => {
            const listing = await Listing.create({
                title: 'From Seed File',
                description: 'This was made by the seed.js file. This is not real data',
                price: 100,
                userId: user.id,
                address1: '255 Weird Street',
                city: 'Anytown USA',
                stateId: states[Math.round(Math.random() * states.length)].id, // i.e., a random state
                zipcode: '92630'
            });
            const today = new Date(Date.now());
            const fiveDaysLater = new Date(Date.now() + (86400000 * 5));
            await Reservation.create({
                startDate: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
                endDate: new Date(fiveDaysLater.getUTCFullYear(), fiveDaysLater.getUTCMonth(), fiveDaysLater.getUTCDate()),
                pricePaid: listing.price * 5,
                listingId: listing.id,
                userId: user.id
            });
        });

        await db.sync();
        await db.close();
        console.log('DB synced!');
    }
    catch (err) {
        console.error(err.message);
    }
})();
