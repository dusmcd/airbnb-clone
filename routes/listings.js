const router = require('express').Router();
const { Listing } = require('../db');
const { isLoggedIn } = require('../helpers');
const cloudinary = require('cloudinary');


router.get('/', async(req, res, next) => {
    const listings = await Listing.findAll();
    res.render('listings/index', { listings: listings });
});

router.get('/new', isLoggedIn, (req, res, next) => {
    res.render('listings/new', { url: '/listings', button: 'Post'});
});

router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        const imageUrlPath = req.body.imageData.slice(0, req.body.imageData.indexOf('#'));
        const imageUrl = `https://res.cloudinary.com/drcrdobkq/${imageUrlPath}`;
        const newListing = await Listing.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            userId: req.user.id,
            imageUrl: imageUrl
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

router.get('/edit/:id', async(req, res, next) => {
    try {
        const listing = await Listing.findByPk(req.params.id);
        res.render('listings/edit', {
            listing: listing,
            button: 'Save Changes',
            url: `/listings/${listing.id}?_method=PUT`
        });
    }
    catch (err) {
        next(err);
    }
});

router.put('/:id', async(req, res, next) => {
    try {
        // update listing here
        res.json(req.body);
        //res.redirect(`/listings/${req.params.id}`);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
