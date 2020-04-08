const router = require('express').Router();
const {User} = require('../db/');
const passport = require('passport');

router.get('/signup', (req, res, next) => {
   res.render('signup'); 
});

router.post('/signup', async (req, res, next) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        req.login(newUser, err => err ? next(err) : res.redirect('/'));
    } catch(err) {
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
   } catch(err) {
       res.send(false);
   }
   
});

module.exports = router;