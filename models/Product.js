const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
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
	},
	price: {
		type: Number,
		required: true
	},
	image: [
		{
			type: String,
			required: true
		}
	]
});

module.exports = product = mongoose.model('Product', ProductSchema);
