/**
 * User Model
 */

// variables
const mongoose = require('mongoose');

// collection schema
const UserSchema = mongoose.Schema({
	phone: {
		type: String,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		index: { unique: true }
	},
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		required: true,
		default: false
	},
	avatar_url: {
		type: String,
		default: ''
	},
	bio: {
		type: String,
		default: ''
	},
	postive_karma: {
		type: Number,
		default: 0
	},
	negative_karma: {
		type: Number,
		default: 0
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// export model
module.exports = mongoose.model('user', UserSchema);
