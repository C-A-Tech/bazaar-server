const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Stall = require('../models/Stall');

router.get('/', async (req, res) => {
	let stalls = await Stall.find();
	res.json(stalls);
});

router.post(
	'/create',
	[
		check('name', 'name required').not().isEmpty(),
		check('user', 'user id required').not().isEmpty(),
		check('section', 'section id required').not().isEmpty()
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		const stall = new Stall({
			name: req.body.name,
			user: req.body.user,
			section: req.body.section
		});
		try {
			await stall.save();
			res.json({ msg: 'Stall created' });
		} catch (err) {
			res.status(400).json({ msg: `${err.keyValue.name} already exists` });
		}
	}
);

module.exports = router;
