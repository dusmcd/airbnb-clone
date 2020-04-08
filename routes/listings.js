const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('listings');
});

module.exports = router;