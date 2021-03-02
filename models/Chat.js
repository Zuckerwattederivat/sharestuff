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
		type: Object,
		message: {
			type: Object,
			messageId: {
				type: String,
				required: true
			},
			from: {
				type: String,
				required: true
			},
			to: {
				type: String,
				required: true
			},
			body: {
				type: String,
				required: true
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	}
});

module.exports = mongoose.model('chat', ChatSchema);
