const router = require('express').Router();
const { Listing } = require('../db');
const { isLoggedIn } = require('../helpers');
const cloudinary = require('cloudinary');

function getPublicId(rawData) {
    const indexPublicId = rawData.lastIndexOf('/') + 1;
    const imagePublicId = rawData.slice(indexPublicId, rawData.indexOf('#'));
    return imagePublicId;
}

function deleteCloudinaryAsset(publicId) {
    if (publicId !== 'lighted-beige-house-1396132_urqgou') {
        // delete old image from cloudinary unless it is the default image provided
        cloudinary.v2.uploader.destroy(publicId.slice(0, publicId.indexOf('.')));
    }
}


/*
    create routes
*/

router.get('/new', isLoggedIn, (req, res, next) => {
    res.render('listings/new', { url: '/listings', button: 'Post', imageButton: 'Upload Image' });
});

router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        let newListingData;
        if (req.body.imageData) {

            newListingData = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                userId: req.user.id,
                imagePublicId: getPublicId(req.body.imageData)
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


/*
    edit/update routes
*/

router.get('/edit/:id', isLoggedIn, async(req, res, next) => {
    try {
        const listing = await Listing.findByPk(req.params.id);
        if (req.user.id !== listing.userId) {
            return res.redirect('/');
        }
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

router.put('/:id', isLoggedIn, async(req, res, next) => {
    try {
        const currentListing = await Listing.findByPk(req.params.id);
        if (req.user.id !== currentListing.userId) {
            return res.redirect('/');
        }
        let updatedListing;
        if (req.body.imageData) {
            deleteCloudinaryAsset(currentListing.imagePublicId);
            updatedListing = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                imagePublicId: getPublicId(req.body.imageData)
            };
        }
        else {
            updatedListing = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
            };
        }
        await currentListing.update(updatedListing);
        res.redirect(`/listings/${req.params.id}`);
    }
    catch (err) {
        next(err);
    }
});

/*
    delete route
*/

router.delete('/:id', isLoggedIn, async(req, res, next) => {
    const listing = await Listing.findByPk(req.params.id);
    if (req.user.id !== listing.userId) {
        return res.redirect('/');
    }
    deleteCloudinaryAsset(listing.imagePublicId);
    await listing.destroy();
    res.redirect('/');

});

/*
    show routes
*/
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

router.get('/:id', async(req, res, next) => {
    try {
        const listing = await Listing.findByPk(req.params.id);
        let showEditButton = req.user && (req.user.id === listing.userId);
        const imageUrl = cloudinary.url(listing.imagePublicId, {
            transformation: {
                dpr: 'auto',
                responsive: true,
                height: 500
            }
        });
        res.render('listings/show', { listing, imageUrl, showEditButton });
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
