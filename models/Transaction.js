const mongoose = require('mongoose');

//Transaction Schema
const TransactionSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: 'N/A',
	},
	amount: {
		type: Number,
		required: true,
	},
	user_id: {
		type: String,
		required: true,
	},
	group: {
		type: String,
		required: true,
	},
	isDeleted: {
		type: Boolean,
		required: true,
		default: false,
	},
	date: {
		type: Date,
	},
});

module.exports = mongoose.model('Transaction', TransactionSchema);
