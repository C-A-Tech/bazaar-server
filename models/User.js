const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	dob: {
		type: String,
		require: true
	},
	image: {
		type: String
	}
});

module.exports = user = mongoose.model('User', UserSchema);
