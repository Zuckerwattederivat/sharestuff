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
		return res.status(400).json({ errors: errors.array()[0] });
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
				return res.status(500).json({ msg: 'Offer could not be booked' });
				// if offer update was successful
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
		Offer.updateOne({ _id: ObjectId(offerId) }, { active: true })
			.then(() => {
				res.status(500).json({ msg: 'Server Error' });
				res.status(500).send('Server error');
			})
			.catch(err => {
				console.error(err.message);
				res.status(500).json({ msg: 'Server Error - Could not reset offer after error occured' });
				res.status(500).send('Server Error - Could not reset offer after error occured');
			});
	}
});

// @route     POST api/bookings/delete
// @desc      Delete booking
// @access    Private
router.delete('/delete', [ auth, check('bookingId', 'No Booking was given ').notEmpty() ], async (req, res) => {
	// check if validation errors exist and response with 400 if true
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array()[0] });
	}

	// get paramters
	const { bookingId } = req.body;

	try {
		// get booking
		const booking = await Booking.findById(bookingId);

		// if booking exists
		if (booking) {
			// cehck if user is authorized to delete the booking
			if (booking.bookedBy === req.user.id || booking.createdBy === req.user.id) {
				// find offer
				const offer = await Offer.findById(booking.offerId);

				// if offer exists
				if (offer) {
					// set offer active
					const updatedOffer = await Offer.updateOne({ _id: ObjectId(booking.offerId) }, { active: true });

					// if offer could not be updated
					if (updatedOffer.nModified !== 1) {
						return res.status(500).json({ msg: 'Offer could not be unbooked' });
						// if offer update was successful
					} else {
						// remove booking
						const payload = await Booking.find({ _id: bookingId }).deleteOne().exec();

						// send response
						if (payload.deletedCount === 1) {
							return res.status(200).json({ msg: 'Booking deleted' });
							// reset offer and send response
						} else {
							await Offer.updateOne({ _id: ObjectId(booking.offerId) }, { active: false });
							return res.status(500).json({ msg: 'Booking could not be deleted' });
						}
					}

					// if offer doesn't exist
				} else {
					return res.status(400).json({ msg: 'Offer does not exist' });
				}

				// if user is unauthorized to delete the offer respond with 401
			} else {
				return res.status(401).json({ msg: 'Authorization denied' });
			}

			// if offer doesn't exists
		} else {
			return res.status(400).json({ msg: 'Booking does not exist' });
		}
	} catch (err) {
		console.error(err.message);
		const booking = await Booking.findById(bookingId);
		Offer.updateOne({ _id: ObjectId(booking.offerId) }, { active: false })
			.then(() => {
				res.status(500).json({ msg: 'Server Error' });
				res.status(500).send('Server error');
			})
			.catch(err => {
				console.error(err.message);
				res.status(500).json({ msg: 'Server Error - Could not reset offer after error occured' });
				res.status(500).send('Server Error - Could not reset offer after error occured');
			});
	}
});

// export router
module.exports = router;
