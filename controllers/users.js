const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

router.post(
	'/signup',
	[
		check('first_name', 'Please enter your first name').not().isEmpty(),
		check('last_name', 'Please enter your last name').not().isEmpty(),
		check('email', 'Please enter your email').isEmail(),
		check('password', 'Please enter a password').not().isEmpty(),
		check('dob', 'Please enter your date of birth').not().isEmpty()
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		const { first_name, last_name, email, password, dob } = req.body;
		user = new User({
			first_name,
			last_name,
			email,
			password,
			dob
		});

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		try {
			await user.save();
			res.send({ msg: 'user has been saved successfully' });
		} catch (err) {
			res.json({ msg: `${err.keyValue.email} already exists` });
		}
	}
);

router.post('/login', async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	// validate the password of the account against the given password.
	if (user && bcrypt.compareSync(req.body.password, user.password)) {
		res.json(user);
	} else {
		res.status(400).json({ msg: 'Invalid email or Password' });
	}
});

module.exports = router;
