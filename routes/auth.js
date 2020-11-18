/**
 * Authentication API
 */

// Node Modules
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// Middleware
const auth = require('../middleware/auth');
// Models
const User = require('../models/User');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
	try {
		// get user from db
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);

		// catch error & send response
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
		res.status(500).send('Server error');
	}
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
	'/',
	[ check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists() ],
	async (req, res) => {
		// check if validation errors exist and response with 400 if true
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// save request content
		const { email, password } = req.body;

		try {
			// check if user exists
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(401).json({ msg: 'Invalid credentials' });
			}

			// compare provided password with existing password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(401).json({ msg: 'Invalid credentials' });
			}

			// create payload & generate web token
			const payload = {
				user: {
					id: user.id
				}
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 3600000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);

			// catch error & send response
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
			res.status(500).send('Server error');
		}
	}
);

// export router
module.exports = router;
