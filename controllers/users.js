const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const parser = require('../middleware/cloudinary.config');

const User = require('../models/User');

router.get('/', async (req, res) => {
	let users = await User.find().select(['-password', '-dob']);
	res.json(users);
});

router.post(
	'/signup',
	parser.single('image'),
	[
		check('first_name', 'Please enter your first name').not().isEmpty(),
		check('last_name', 'Please enter your last name').not().isEmpty(),
		check('email', 'Please enter your email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
		check('dob', 'Please enter your date of birth').not().isEmpty()
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		const { first_name, last_name, email, password, dob } = req.body;

		const image = req.file ? req.file.path : '';
		user = new User({
			first_name,
			last_name,
			email,
			password,
			dob,
			image
		});

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		try {
			await user.save();
			res.send({ msg: 'user has been saved successfully' });
		} catch (err) {
			return res.json({ msg: `${err.keyValue.email} already exists` });
		}
	}
);

router.post('/login', async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	// validate the password of the account against the given password.
	if (user && bcrypt.compareSync(req.body.password, user.password)) {
		return res.json(user);
	} else {
		return res.json({ msg: 'Invalid email or Password' });
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.json({ msg: 'user not found' });
		}

		await user.remove();

		res.json({ msg: 'user removed' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

router.put('/update/:id', parser.single('image'), async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.json({ msg: 'user not found' });
		}

		const first_name = req.body.first_name || user.first_name;
		const last_name = req.body.last_name || user.last_name;
		const dob = req.body.dob || user.dob;
		const image = req.file ? req.file.path : user.image;

		await User.findByIdAndUpdate(req.params.id, {
			first_name: first_name,
			last_name: last_name,
			dob: dob,
			image: image
		});

		res.json({ msg: 'User updated' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

module.exports = router;
