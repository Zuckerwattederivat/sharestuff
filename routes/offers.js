/**
 * Offers API
 */

// Node Modules
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { v1: uuidv1 } = require('uuid');
const _ = require('lodash');
const jimp = require('jimp');
const fs = require('fs');
// Middleware
const auth = require('../middleware/auth');
// Models
const Offer = require('../models/Offer');
// Multer
const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/uploads/img/offers');
	},
	filename: (req, file, cb) => {
		const fileExtension = file.mimetype.split('/');
		cb(null, uuidv1() + `.${fileExtension[1]}`);
	}
});
const fileFilter = (req, file, cb) => {
	// reject file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 6
	},
	fileFilter: fileFilter
});
// utils
const paragraphsToArray = require('../util/paragraphsToArray');

// @route     POST api/offers/create
// @desc      Create offer
// @access    Private
router.post(
	'/create',
	[
		auth,
		upload.array('images', 4),
		check('title', 'Enter a title for your offer').notEmpty(),
		check('price', 'Enter the daily price of your offer').notEmpty(),
		check('description', 'Describe what you are offering').notEmpty(),
		check('product', 'What product are you offering?').notEmpty(),
		check('tags', 'Add some tags for finding your offer').notEmpty(),
		check('categoryId', 'Choose a category for your offer').notEmpty(),
		check('location', 'Enter the location of your offer').notEmpty()
	],
	async (req, res) => {
		// check if validation errors exist and response with 400 if true
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			req.files.map(file => {
				fs.unlink(file.path, err => {
					if (err) {
						console.error(err);
					} else {
						console.log(file.path + ' was deleted');
					}
				});
			});
			return res.status(400).json({ errors: errors.array() });
		}

		// save request body
		const { title, product, tags, categoryId, location, price } = req.body;
		const description = paragraphsToArray(req.body.description);
		const createdBy = req.user.id;
		let images = [];
		let imagesThumb = [];
		if (req.files[0]) {
			images = req.files.map(file => {
				return file.path;
			});
			imagesThumb = req.files.map(file => {
				const pathSplit = file.path.split('.');
				const imageThumb = `${pathSplit[0]}-thumb.${pathSplit[1]}`;
				return imageThumb;
			});
		} else {
			return res.status(400).json({ msg: 'Upload an image file' });
		}

		try {
			// image handler
			await images.map((image, i) => {
				return jimp
					.read(image)
					.then(offerImage => {
						return offerImage
							.cover(600, 400) // resize cover
							.quality(90) // set JPEG quality
							.write(imagesThumb[i]); // save
					})
					.catch(err => {
						console.error(err.message);
						return res.status(500).json({ msg: 'Server error' });
					});
			});

			// instantiate new offer
			const offer = new Offer({
				title,
				description,
				product,
				price,
				tags,
				categoryId,
				createdBy,
				location,
				images,
				imagesThumb
			});

			// save offer
			await offer.save();

			// response
			res.json({ msg: 'Offer created successfully' });

			// catch error & send response
		} catch (err) {
			req.files.map(file => {
				fs.unlink(file.path, err => {
					if (err) {
						console.error(err);
					} else {
						console.log(file.path + ' was deleted');
					}
				});
			});
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
			res.status(500).send('Server error');
		}
	}
);

// @route     GET api/offers/get
// @desc      Get active offers all; rand; limit; by id
// @access    Public
router.get('/get', async (req, res) => {
	// save request content
	const { id, rand, limit } = req.query;

	//console.log(id);

	try {
		// return all offers
		if (!id) {
			const offers = await Offer.find({ active: true });

			// send error response
			if (!offers) {
				return res.status(200).json({ msg: 'No offer was found' });

				// send response
			} else {
				let offerMap = [];
				offers.forEach(offer => {
					offerMap.push(offer);
				});
				// send random with limit
				if (rand && limit) {
					offerMap = _.sampleSize(offerMap, limit);
					// send random without limit
				} else if (rand) {
					offerMap = _.shuffle(offerMap);
				}
				res.send(offerMap);
			}

			// return searched offer
		} else {
			const offer = await Offer.findById(id);

			// send error response
			if (!offer) {
				return res.status(200).json({ msg: 'No offer was found' });

				// if offer is inactive
			} else if (!offer.active) {
				return res.status(200).json({ msg: 'No offer was found' });

				// send response
			} else {
				res.json(offer);
			}
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
		res.status(500).send('Server error');
	}
});

// export router
module.exports = router;
