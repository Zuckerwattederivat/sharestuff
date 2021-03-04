/**
 * Chats API
 */

// Node Modules
const express = require('express');
const router = express.Router();
// Middleware
const auth = require('../middleware/auth');
// Models
const Offer = require('../models/Offer');
const Booking = require('../models/Booking');
const Chat = require('../models/Chat');

// @route     GET api/chats/all
// @desc      Get overview of all chats
// @access    Private
router.get('/all', auth, async (req, res) => {});

// @route     GET api/chats/single
// @desc      Open specific chat
// @access    Private
router.get('/single', auth, async (req, res) => {});

// @route     POST api/chats/new
// @desc      Create new chat
// @access    Private
router.post('/new', auth, async (req, res) => {
	try {
	} catch (error) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
		res.status(500).send('Server error');
	}
});

// export router
module.exports = router;
