/**
 * Category Model
 */

// variables
const mongoose = require('mongoose');

// collection schema
const CategorySchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		index: { unique: true }
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		default: 'public/img/category-placeholder.jpg'
	}
});

// export module
module.exports = mongoose.model('Category', CategorySchema);
