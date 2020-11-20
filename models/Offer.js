/**
 * Article Model
 */

// variables
const mongoose = require('mongoose');

// collection schema
const OfferSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		index: true
	},
	description: {
		type: String,
		required: true
	},
	product: {
		type: String,
		required: true
	},
	tags: {
		type: String,
		required: true
	},
	categoryId: {
		type: String,
		required: true,
		index: true
	},
	location: {
		type: Object,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	},
	images: [ { type: String, default: '/public/img/product-placeholder.jpg' } ],
	imagesThumb: [ { type: String, default: '/public/img/product-placeholder.jpg' } ],
	active: {
		type: Boolean,
		required: true,
		default: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// export modules
module.exports = mongoose.model('offer', OfferSchema);
