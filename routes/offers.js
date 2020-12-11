/**
 * Offers API
 */

// Node Modules
const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const { v1: uuidv1 } = require('uuid');
const _ = require('lodash');
const jimp = require('jimp');
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;
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
		check('price', 'Enter the daily price of your offer').isNumeric(),
		check('currency', 'Choose the denomination of your offer').isString(),
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
		const { categoryId, price, currency, title } = req.body;
		// save content to lower case
		const product = req.body.product.toLowerCase();
		const tagsRecieved = JSON.parse(req.body.tags);
		const tags = tagsRecieved.map(e => {
			return e.toLowerCase();
		});
		// save location
		const location = JSON.parse(req.body.location);
		// save desctiption paragraphs to array
		const description = paragraphsToArray(req.body.description);
		// save user
		const createdBy = req.user.id;
		// save image paths
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
				currency,
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
				// delete image
				fs.unlink(file.path, err => {
					if (err) {
						console.error(err);
					} else {
						console.log(file.path + ' was deleted');
					}
				});
				// delete thumb
				const filePath = file.path.split('.');
				const filePathThumb = filePath[0] + '-thumb.' + filePath[1];
				setTimeout(() => {
					fs.unlink(filePathThumb, err => {
						if (err) {
							console.error(err);
						} else {
							console.log(file.path + ' was deleted');
						}
					});
				}, 2000);
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
	const { id, sort, limit, createdBy } = req.query;

	try {
		// return all offers
		if (!id && !sort && !createdBy) {
			const offers = await Offer.find({ active: true });

			// send error response
			if (!offers[0]) {
				return res.status(200).json({ msg: 'No offer was found' });
				// send response
			} else {
				res.json(offers);
			}

			// return offers by date and limit
		} else if (!id && sort && !createdBy) {
			let offers;

			// with limit
			if (limit) {
				offers = await Offer.find({ active: true }).sort({ date: sort }).limit(parseInt(limit));
				// without limit
			} else {
				offers = await Offer.find({ active: true }).sort({ date: sort });
			}

			// send error response
			if (!offers[0]) {
				return res.status(200).json({ msg: 'No offer was found' });
				// send response
			} else {
				res.json(offers);
			}

			// return offers by user id
		} else if (createdBy && !id) {
			let offers;

			// with limit
			if (limit && sort) {
				offers = await Offer.find({ active: true, createdBy: createdBy }).sort({ date: sort }).limit(parseInt(limit));
				// without limit
			} else if (!limit && sort) {
				offers = await Offer.find({ active: true, createdBy: createdBy }).sort({ date: sort });
			} else if (limit && !sort) {
				offers = await Offer.find({ active: true, createdBy: createdBy }).limit(parseInt(limit));
			} else {
				offers = await Offer.find({ active: true, createdBy: createdBy });
			}

			// send error response
			if (!offers[0]) {
				return res.status(200).json({ msg: 'No offer was found' });
				// send response
			} else {
				res.json(offers);
			}

			// return offer by id
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

// @route     POST api/offers/search
// @desc      Search active offers by field values
// @access    Public
router.post('/search', async (req, res) => {
	// save filter
	const { filter } = req.body;

	// filter parameters
	const searchParameters = {
		categoryId: req.body.categoryId,
		price: req.body.price,
		createdBy: req.body.createdBy,
		location: req.body.location,
		product: req.body.product ? req.body.product.toLowerCase() : undefined,
		tags: req.body.tags
			? req.body.tags.map(e => {
					if (e) return e.toLowerCase();
				})
			: []
	};
	// add product to tags
	if (searchParameters.product) searchParameters.tags.push(searchParameters.product);

	try {
		// return if filter is false
		if (
			!filter.product &&
			!filter.tags[0] &&
			!filter.price &&
			!filter.createdBy &&
			!filter.categoryId &&
			!filter.location
		) {
			const offers = await Offer.find({ active: true });
			if (offers) {
				return res.json(offers);
			} else {
				return res.status(200).json({ msg: 'No offer was found' });
			}
		}

		//search by product and tags
		const searchByProductAndTags = async () => {
			let offers = [];
			if (filter.product && !filter.tags) {
				offers = await Offer.find({
					active: true,
					$text: { $search: `${searchParameters.product}` }
				});
			} else if (!filter.product && filter.tags) {
				offers = await Offer.find({
					active: true,
					$text: { $search: `${searchParameters.tags}` }
				});
			} else {
				console.log('hell9');
				offers = await Offer.find({
					active: true,
					$text: { $search: `${searchParameters.product} ${searchParameters.tags}` }
				});
			}
			if (offers) {
				return Promise.resolve(offers);
			} else {
				return Promise.resolve(false);
			}
		};

		// search by location
		const searchByLocation = async () => {
			let offers;
			if (searchParameters.location.neighbourhood) {
				offers = await Offer.find({
					active: true,
					$text: { $search: `${searchParameters.location.neighbourhood}` }
				});
			} else if (!searchParameters.location.neighbourhood && searchParameters.location.locality) {
				offers = await Offer.find({
					active: true,
					$text: { $search: `${searchParameters.location.locality}` }
				});
			} else if (
				!searchParameters.location.neighbourhood &&
				!searchParameters.location.locality &&
				searchParameters.location.country
			) {
				offers = await Offer.find({
					active: true,
					$text: { $search: `${searchParameters.location.country}` }
				});
			}
			if (offers) {
				return Promise.resolve(offers);
			} else {
				return Promise.resolve(false);
			}
		};

		// search by category id
		const searchByCategoryId = async () => {
			const offers = await Offer.find({
				active: true,
				categoryId: searchParameters.categoryId
			});
			if (offers) {
				return Promise.resolve(offers);
			} else {
				return Promise.resolve(false);
			}
		};

		// search by creator id
		const searchByCreator = async () => {
			const offers = await Offer.find({
				active: true,
				createdBy: searchParameters.createdBy
			});
			if (offers) {
				return Promise.resolve(offers);
			} else {
				return Promise.resolve(false);
			}
		};

		// search by price
		const searchByPrice = async () => {
			const offers = await Offer.find({
				active: true,
				price: { $lte: searchParameters.price }
			});
			if (offers) {
				return Promise.resolve(offers);
			} else {
				return Promise.resolve(false);
			}
		};

		// filter product
		const filterProductOrTags = offers => {
			let filtered = [];
			if (filter.product || filter.tags) {
				_.map(offers, offer => {
					if (offer.product.includes(searchParameters.product)) filtered.push(offer);
				});
				_.map(offers, offer => {
					if (_.difference(searchParameters.tags, offer.tags).length < searchParameters.tags.length)
						filtered.push(offer);
				});
				const filteredWithoutDuplicates = _.uniqBy(filtered, e => {
					return e._id;
				});
				return Promise.resolve(filteredWithoutDuplicates);
				// } else if (filter.product && !filter.tags) {
				// 	_.map(offers, offer => {
				// 		if (offer.product.includes(searchParameters.product)) filtered.push(offer);
				// 	});
				// 	return Promise.resolve(filtered);
				// } else if (!filter.product && filter.tags) {
				// 	_.map(offers, offer => {
				// 		if (_.difference(searchParameters.tags, offer.tags).length < searchParameters.tags.length)
				// 			filtered.push(offer);
				// 	});
				// 	return Promise.resolve(filtered);
				// }
			} else {
				return Promise.resolve(offers);
			}
		};
		// filter category
		const filterCategory = offers => {
			let filtered = [];
			if (filter.categoryId) {
				_.map(offers, offer => {
					if (offer.categoryId === searchParameters.categoryId) filtered.push(offer);
				});
				return Promise.resolve(filtered);
			} else {
				return Promise.resolve(offers);
			}
		};
		// filter category
		const filterCreatedBy = offers => {
			let filtered = [];
			if (filter.createdBy) {
				_.map(offers, offer => {
					if (offer.createdBy === searchParameters.createdBy) filtered.push(offer);
				});
				return Promise.resolve(filtered);
			} else {
				return Promise.resolve(offers);
			}
		};
		// filter for lower value
		const filterPrice = offers => {
			let filtered = [];
			if (filter.price) {
				_.map(offers, offer => {
					if (offer.price <= searchParameters.price) filtered.push(offer);
				});
				return Promise.resolve(filtered);
			} else {
				return Promise.resolve(offers);
			}
		};

		// filter location query
		if (filter.location) {
			const offersByLocation = await searchByLocation();
			if (offersByLocation) {
				filterProductOrTags(offersByLocation).then(resolve => {
					filterCategory(resolve).then(resolve => {
						filterCreatedBy(resolve).then(resolve => {
							filterPrice(resolve).then(resolve => {
								if (resolve[0]) {
									return res.json(resolve);
								} else {
									return res.status(200).json({ msg: 'No offer was found' });
								}
							});
						});
					});
				});
			} else {
				return res.status(200).json({ msg: 'No offer was found' });
			}
		}

		// filter product query
		if (!filter.location && filter.product) {
			const offersByProductOrTags = await searchByProductAndTags();
			if (offersByProductOrTags) {
				filterCategory(offersByProductOrTags).then(resolve => {
					filterCreatedBy(resolve).then(resolve => {
						filterPrice(resolve).then(resolve => {
							if (resolve[0]) {
								return res.json(resolve);
							} else {
								return res.status(200).json({ msg: 'No offer was found' });
							}
						});
					});
				});
			} else {
				return res.status(200).json({ msg: 'No offer was found' });
			}
		}

		// filter tags query
		if (!filter.location && !filter.product && filter.tags) {
			const offersByProductOrTags = await searchByProductAndTags();
			if (offersByProductOrTags) {
				filterCategory(offersByProductOrTags).then(resolve => {
					filterCreatedBy(resolve).then(resolve => {
						filterPrice(resolve).then(resolve => {
							if (resolve[0]) {
								return res.json(resolve);
							} else {
								return res.status(200).json({ msg: 'No offer was found' });
							}
						});
					});
				});
			} else {
				return res.status(200).json({ msg: 'No offer was found' });
			}
		}

		// filter category id query
		if (filter.categoryId && !filter.location && !filter.product && !filter.tags) {
			const offersByCategory = await searchByCategoryId();
			if (offersByCategory) {
				filterProductOrTags(offersByCategory).then(resolve => {
					filterCreatedBy(resolve).then(resolve => {
						filterPrice(resolve).then(resolve => {
							if (resolve[0]) {
								return res.json(resolve);
							} else {
								return res.status(200).json({ msg: 'No offer was found' });
							}
						});
					});
				});
			} else {
				return res.status(200).json({ msg: 'No offer was found' });
			}
		}

		// filter user query
		if (filter.createdBy && !filter.categoryId && !filter.location && !filter.product && !filter.tags) {
			const offersByCreator = await searchByCreator();
			if (offersByCreator) {
				filterProductOrTags(offersByCreator).then(resolve => {
					filterCategory(resolve).then(resolve => {
						filterPrice(resolve).then(resolve => {
							if (resolve[0]) {
								return res.json(resolve);
							} else {
								return res.status(200).json({ msg: 'No offer was found' });
							}
						});
					});
				});
			} else {
				return res.status(200).json({ msg: 'No offer was found' });
			}
		}

		// filter price query
		if (
			filter.price &&
			!filter.createdBy &&
			!filter.categoryId &&
			!filter.location &&
			!filter.product &&
			!filter.tags
		) {
			const offersByPrice = await searchByPrice();
			if (offersByPrice) {
				filterProductOrTags(offersByPrice).then(resolve => {
					filterCategory(resolve).then(resolve => {
						filterCreatedBy(resolve).then(resolve => {
							if (resolve[0]) {
								return res.json(resolve);
							} else {
								return res.status(200).json({ msg: 'No offer was found' });
							}
						});
					});
				});
			} else {
				return res.status(200).json({ msg: 'No offer was found' });
			}
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
		res.status(500).send('Server error');
	}
});

// @route     PUT api/offers/book
// @desc      Book offer
// @access    Private
router.put('/book', auth, async (req, res) => {
	// save request data
	const { offerId } = req.body;

	try {
		// define errors
		let err;

		// update offer
		if (offerId) {
			const res = await Offer.updateOne({ _id: ObjectId(offerId) }, { active: false, bookedBy: req.user.id });
			if (res.nModified !== 1) err = 'Could not book the offer';
		} else {
			err = 'Recieved no offer id';
		}

		// send response
		if (err) {
			res.status(400).json({ err: err });
		} else {
			res.status(200).json({ msg: 'Offer was booked' });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
		res.status(500).send('Server error');
	}
});

// @route     PUT api/offers/unbook
// @desc      Unbook offer
// @access    Private
router.put('/unbook', auth, async (req, res) => {
	// save request data
	const { offerId } = req.body;

	try {
		// define errors
		let err;
		// search offer
		const offer = await Offer.findById(offerId);

		// update offer
		if (offer.bookedBy === req.user.id || offer.createdBy === req.user.id) {
			if (offerId) {
				const res = await Offer.updateOne({ _id: ObjectId(offerId) }, { active: true, bookedBy: null });
				if (res.nModified !== 1) err = 'Could not unbook the offer';
			} else {
				err = 'Recieved no offer id';
			}
		} else {
			return res.status(401).json({ err: 'You are unauthorized to unbook this offer' });
		}

		// send response
		if (err) {
			res.status(400).json({ err: err });
		} else {
			res.status(200).json({ msg: 'Offer was unbooked' });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
		res.status(500).send('Server error');
	}
});

// export router
module.exports = router;
