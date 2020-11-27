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
		type: Array,
		required: true
	},
	product: {
		type: String,
		required: true,
		index: true
	},
	price: {
		type: Number,
		required: true
	},
	currency: {
		type: String,
		required: true,
		index: true
	},
	tags: {
		type: Array,
		required: true,
		index: true
	},
	categoryId: {
		type: String,
		required: true,
		index: true,
		index: true
	},
	location: {
		type: Object,
		required: true,
		index: true
	},
	createdBy: {
		type: String,
		required: true,
		index: true
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

// create text index
OfferSchema.index({ '$**': 'text' });

// export modules
module.exports = mongoose.model('offer', OfferSchema);
