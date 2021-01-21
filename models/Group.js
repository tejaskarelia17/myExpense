const mongoose = require('mongoose');

//Group Schema
const GroupSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	user_id: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
	},
});

module.exports = mongoose.model('Group', GroupSchema);
