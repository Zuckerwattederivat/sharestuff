/**
 * Chats API
 */

// Node Modules
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { v1: uuidv1 } = require('uuid');
// Middleware
const auth = require('../middleware/auth');
// Models
const Offer = require('../models/Offer');
const Booking = require('../models/Booking');
const Chat = require('../models/Chat');

// @route     GET api/chats/get/overview
// @desc      Get overview of all chats
// @access    Private
router.get('/get/all', auth, async (req, res) => {});

// @route     GET api/chats/open/single
// @desc      Open specific chat
// @access    Private
router.get('/get/single', auth, async (req, res) => {});

// @route     POST api/chats/create
// @desc      Create new chat
// @access    Private
router.post('/post', [ auth, check('message', 'Please type in a message').notEmpty() ], async (req, res) => {
	// check if validation errors exist and response with 400 if true
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array()[0] });
	}

	try {
	} catch (error) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
		res.status(500).send('Server error');
	}
});

// export router
module.exports = router;
