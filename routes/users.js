const router = require('express').Router();
const {User} = require('../db/');

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

module.exports = router;