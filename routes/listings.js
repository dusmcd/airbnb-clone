const router = require('express').Router();
const { Listing } = require('../db');
const { isLoggedIn } = require('../helpers');
const cloudinary = require('cloudinary');


router.get('/', async(req, res, next) => {
    const listings = await Listing.findAll();
    for (let i = 0; i < listings.length; i++) {
        const imageUrl = cloudinary.url(listings[i].imagePublicId, {
            transformation: {
                dpr: 'auto',
                responsive: true,
                height: 550
            }
        });
        listings[i].dataValues.imageUrl = imageUrl;
    }
    res.render('listings/index', { listings: listings });
});

router.get('/new', isLoggedIn, (req, res, next) => {
    res.render('listings/new', { url: '/listings', button: 'Post', imageButton: 'Upload Image' });
});

router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        let newListingData;
        if (req.body.imageData) {
            const indexPublicId = req.body.imageData.lastIndexOf('/') + 1;
            const imagePublicId = req.body.imageData.slice(indexPublicId, req.body.imageData.indexOf('#'));
            newListingData = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                userId: req.user.id,
                imagePublicId: imagePublicId
            };
        }
        else {
            newListingData = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                userId: req.user.id,
            };
        }
        const newListing = await Listing.create(newListingData);
        res.redirect(`/listings/${newListing.id}`);
    }
    catch (err) {
        next(err);
    }
});

router.get('/:id', async(req, res, next) => {
    try {
        const listing = await Listing.findByPk(req.params.id);
        const imageUrl = cloudinary.url(listing.imagePublicId, {
            transformation: {
                dpr: 'auto',
                responsive: true,
                height: 500
            }
        });
        res.render('listings/show', { listing: listing, imageUrl: imageUrl });
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
            imageButton: 'Replace Current Image',
            url: `/listings/${listing.id}?_method=PUT`
        });
    }
    catch (err) {
        next(err);
    }
});

router.put('/:id', async(req, res, next) => {
    try {
        const imageUrlPath = req.body.imageData.slice(0, req.body.imageData.indexOf('#'));
        const imageUrl = `https://res.cloudinary.com/drcrdobkq/${imageUrlPath}`;
        await Listing.update({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrl: imageUrl
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect(`/listings/${req.params.id}`);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
