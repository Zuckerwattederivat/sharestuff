/**
 * User Model
 */

// variables
const mongoose = require('mongoose');

// collection schema
const UserSchema = mongoose.Schema({
	verified: {
		type: Boolean,
		required: true,
		default: false
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	address: {
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
		type: Object,
		required: true
	},
	phone: {
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
	avatar: {
		type: String,
		default: '/public/img/avatar-placeholder.svg'
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

// create text index
UserSchema.index({ '$**': 'text' });

// export model
module.exports = mongoose.model('user', UserSchema);
