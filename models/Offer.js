/**
 * Article Model
 */

// variables
const mongoose = require('mongoose');

// collection schema
const OfferSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
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
	category: {
		type: String,
		required: true
	},
	location: {
		type: Object,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	},
	pictures: {
		type: Array,
		default: [ 'product-placeholder.jpg' ]
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
