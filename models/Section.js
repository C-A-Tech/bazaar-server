const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	}
});

module.exports = section = mongoose.model('Section', SectionSchema);
