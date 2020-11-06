/**
 * User Model
 */

// variables
const mongoose = require('mongoose');

// collection schema
const UserSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	adress: {
		type: String,
		required: true
	},
	zipCode: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true,
		unique: true
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
	avatarUrl: {
		type: String,
		default: ''
	},
	bio: {
		type: String,
		default: ''
	},
	positiveKarma: {
		type: Number,
		default: 0
	},
	negativeKarma: {
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
