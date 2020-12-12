/**
 * Bookings API
 */

// Node Modules
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');
// Middleware
const auth = require('../middleware/auth');
// Models
const Booking = require('../models/Booking');
const Offer = require('../models/Offer');

// @route     POST api/bookings/create
// @desc      Create booking
// @access    Private
router.post('/create', [ auth, check('offerId', 'No offer was given ').notEmpty() ], async (req, res) => {
	// check if validation errors exist and response with 400 if true
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// get paramters
	const { offerId } = req.body;

	try {
		// get offer
		const offer = await Offer.findById(offerId);

		// if offer exists
		if (offer) {
			// set offer inactive
			const updatedOffer = await Offer.updateOne({ _id: ObjectId(offerId) }, { active: false });

			// if offer could not be updated
			if (updatedOffer.nModified !== 1) {
				return res.status(500).json({ msg: 'Offer could not be set to booked' });
				// if offer update was successfull
			} else {
				// create booking
				const booking = new Booking({
					offerId: offerId,
					categoryId: offer.categoryId,
					bookedBy: req.user.id,
					offeredBy: offer.createdBy
				});
				// save booking
				const payload = await booking.save();

				// send response
				if (payload) {
					return res.status(200).json(payload);

					// reset offer and send response
				} else {
					await Offer.updateOne({ _id: ObjectId(offerId) }, { active: true });
					return res.status(500).json({ msg: 'Booking could not be created' });
				}
			}
			// if offer doesn't exists
		} else {
			return res.status(400).json({ msg: 'Offer does not exist' });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
		res.status(500).send('Server error');
	}
});

// export router
module.exports = router;
