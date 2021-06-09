const mongoose = require('mongoose');

const StallSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	section: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	}
});

module.exports = stall = mongoose.model('Stall', StallSchema);
