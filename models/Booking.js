/**
 * Booking Model
 */

// variables
const mongoose = require('mongoose');

// collection schema
const BookingSchema = mongoose.Schema({
	offerId: {
		type: String,
		index: true,
		required: true
	},
	bookedBy: {
		type: String,
		index: true,
		required: true
	},
	offeredBy: {
		type: String,
		index: true,
		required: true
	},
	categoryId: {
		type: String,
		required: true,
		index: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// create text index
BookingSchema.index({ '$**': 'text' });

// export modules
module.exports = mongoose.model('booking', BookingSchema);
