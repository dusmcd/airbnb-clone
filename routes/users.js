const router = require('express').Router();
const { User, Listing, Reservation } = require('../db/');
const passport = require('passport');
const { isLoggedIn } = require('../helpers');

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', async(req, res, next) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        req.login(newUser, err => err ? next(err) : res.redirect('/'));
    }
    catch (err) {
        next(err);
    }
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}));

router.post('/logout', (req, res, next) => {
    try {
        req.logout();
        res.send(true);
    }
    catch (err) {
        res.send(false);
    }

});

router.get('/me', isLoggedIn, async(req, res, next) => {
    try {
        // get listings made by user
        // get reservations for those listings
        // get reservations made by user
        const listings = await Listing.findAll({
            where: {
                userId: req.user.id
            },
            include: [Reservation]
        });
        const reservations = await Reservation.findAll({
            where: {
                userId: req.user.id
            },
            include: [Listing]
        });
        res.render('users/profile', { listings, reservations });
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
