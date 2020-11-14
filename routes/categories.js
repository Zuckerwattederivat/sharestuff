/**
 * Authentication API
 */

// variables
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Category = require('../models/Category');

// @route     POST server/categories
// @desc      Create categories
// @access    Private
router.post('/', [ auth, check('title', 'Please enter a category name').notEmpty() ], async (req, res) => {
	// check if validation errors exist and response with 400 if true
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// save request content
	const title = req.body.title.toLowerCase();

	try {
		// get user from db
		const user = await User.findById(req.user.id);

		// error if user not admin
		if (!user.admin) {
			return res.status(401).json({ msg: 'Unauthorized' });
		}

		// instantiate new category
		const category = new Category({
			title
		});

		// save category
		await category.save();

		// response
		res.json({ msg: `${category.title[0].toUpperCase() + category.title.slice(1)} category created successfully` });

		// catch error & send response
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
		res.status(500).send('Server error');
	}
});

// @route     GET server/categories
// @desc      Get categories
// @access    Public
router.get('/', async (req, res) => {
	// save request content
	const { title } = req.query;

	try {
		// return all categories
		if (!title) {
			const categories = await Category.find({});

			// send error response
			if (!categories) {
				return res.status(200).json({ msg: 'No category was found' });

				// send response
			} else {
				const categoryMap = {};
				categories.forEach(category => {
					categoryMap[category._id] = category;
				});
				res.send(categoryMap);
			}

			// return searched category
		} else {
			const category = await Category.findOne({ title });

			// send error response
			if (!category) {
				return res.status(200).json({ msg: 'No category was found' });

				// send response
			} else {
				res.json(category);
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
