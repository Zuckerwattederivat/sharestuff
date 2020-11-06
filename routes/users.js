/**
 * Users API
 */

// variables
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
	'/',
	[
		check('firstname', 'Please enter your firstname').not().isEmpty(),
		check('lastname', 'Please enter your lastname').not().isEmpty(),
		check('address', 'Please enter your address').not().isEmpty(),
		check('zipCode', 'Please enter your zip code').not().isEmpty(),
		check('city', 'Please enter your city').not().isEmpty(),
		check('country', 'Please enter your country').not().isEmpty(),
		check('phone', 'Please enter a valid phone number').isNumeric(),
		check('email', 'Please include a valid email').isEmail(),
		check('username', 'Please enter a username').not().isEmpty(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		// check if validation errors exist and response with 400 if true
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ errors: errors.array() });
		}

		// save request content
		const { firstname, lastname, address, zipCode, city, country, phone, email, username, password } = req.body;

		// create user and save to db
		try {
			// check if user already exists
			let phoneExists = await User.findOne({ phone });
			if (phoneExists) {
				return res.status(200).json({ msg: 'Phone number already exists' });
			}
			let emailExists = await User.findOne({ email });
			if (emailExists) {
				return res.status(200).json({ msg: 'Email already exists' });
			}

			// check if username already exists
			let existingUsername = await User.findOne({ username });
			if (existingUsername) {
				return res.status(200).json({ msg: 'Username is already taken' });
			}

			// instantiate new user
			user = new User({
				firstname,
				lastname,
				address,
				zipCode,
				city,
				country,
				phone,
				email,
				username,
				password
			});

			// hash password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// save user
			await user.save();

			// create payload
			const payload = {
				user: {
					id: user.id
				}
			};

			// generate web token & send response
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: '1h'
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);

			// catch error & send response
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route     GET api/users
// @desc      Get user
// @access    Public
router.get('/', async (req, res) => {
	// save request content
	const { email, username } = req.query;

	try {
		// get user from db
		let user = await User.findOne({ email });
		!user ? (user = await User.findOne({ username })) : '';

		// send response
		if (!user) {
			return res.status(200).json({ msg: 'No user was found' });
		} else {
			// create payload
			const payload = {
				user: {
					username: user.username,
					city: user.city,
					bio: user.bio,
					avatarUrl: user.avatarUrl,
					positiveKarma: user.positiveKarma,
					negativeKarma: user.negativeKarma,
					date: user.date
				}
			};
			// send response
			res.json(payload);
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// export router
module.exports = router;
