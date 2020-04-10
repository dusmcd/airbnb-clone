function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect('/users/login');
}

module.exports = isLoggedIn;
