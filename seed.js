require('./secrets');
const { db, Listing, Reservation, User } = require('./db');

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

        const users = await Promise.all([User.create(dustin), User.create(phil)]);

        users.forEach(async user => {
            const listing = await Listing.create({
                title: 'From Seed File',
                description: 'This was made by the seed.js file. This is not real data',
                price: 100,
                userId: user.id
            });
            await Reservation.create({
                startDate: new Date(Date.now()),
                endDate: new Date(Date.now() + (86400000 * 5)),
                pricePaid: listing.price,
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
