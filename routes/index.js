const router = require('express').Router();

router.use('/listings', require('./listings'));
router.use('/users', require('./users'));

module.exports = router;