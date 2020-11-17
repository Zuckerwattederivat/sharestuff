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
	descitpiton: {
		type: String,
		required: true
	},
	product: {
		type: String,
		required: true
	},
	tags: {
		type: Array,
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
	createdByUserId: {
		type: String,
		required: true
	},
	images: {
		type: Array,
		default: [ 'public/img/product-placeholder.jpg' ]
	},
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
module.exports = mongoose.model('product', OfferSchema);