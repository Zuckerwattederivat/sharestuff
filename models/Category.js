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
	image: {
		type: String,
		default: 'public/img/placeholder.jpg'
	}
});

// export module
module.exports = mongoose.model('Category', CategorySchema);
