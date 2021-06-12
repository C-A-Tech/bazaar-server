const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const parser = require("../middleware/cloudinary.config");

const Section = require('../models/Section');

router.get('/', async (req, res) => {
	let sections = await Section.find();
	res.json(sections);
});

router.post(
	'/create',
	parser.single('image'),

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ msg: errors.array() }).status(400);
		}
		const section = new Section({
			title: req.body.title,
			image: req.file.path
		});
		try {
			await section.save();
			res.json({ msg: 'section created' });
		} catch (err) {
			res.json({ msg: `${err.keyValue.title} already exists` }).status(400);
		}
	}
);

module.exports = router;
