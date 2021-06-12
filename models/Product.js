const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
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
	},
	stall: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Stall'
	}
});

module.exports = product = mongoose.model('Product', ProductSchema);
