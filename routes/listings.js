const router = require('express').Router();
const { Listing } = require('../db');

router.get('/', (req, res, next) => {
    res.render('listings/index');
});

router.get('/new', (req, res, next) => {
    res.render('listings/new', { url: '/listings', button: 'Post' });
});

router.post('/', async(req, res, next) => {
    try {
        const newListing = await Listing.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            userId: req.user.id
        });
        res.redirect(`/listings/${newListing.id}`);
    }
    catch (err) {
        next(err);
    }
});

router.get('/:id', async(req, res, next) => {
    try {
        const listing = await Listing.findByPk(req.params.id);
        res.render('listings/show', { listing: listing });
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
