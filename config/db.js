const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
require('dotenv').config();

const { MONGO_URI } = process.env;

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		});

		console.log('MongoDB connected...');
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
