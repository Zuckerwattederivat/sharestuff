const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
	offerId: {
		type: String,
		required: true
	},
	bookedBy: {
		type: String,
		required: true
	},
	bookedFrom: {
		type: String,
		required: true
	},
	messages: {
		type: Object
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('chat', ChatSchema);
