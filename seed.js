require('./secrets');
const { db } = require('./db');

db.sync({ force: true }).then(() => {
    console.log('DB synced!');
    db.close();
}).catch(err => console.error(err.message));
