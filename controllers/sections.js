const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const parser = require('../middleware/cloudinary.config');

const Section = require('../models/Section');

router.get('/', async (req, res) => {
	let sections = await Section.find();
	res.json(sections);
});

router.post(
	'/create',
	parser.single('image'),
	[check('title', 'title required').not().isEmpty()],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ msg: errors.array() });
		}
		const section = new Section({
			title: req.body.title,
			image: req.file.path
		});
		try {
			await section.save();
			return res.json({ msg: 'section created' });
		} catch (err) {
			return res.json({ msg: 'This section already exists' });
		}
	}
);

router.get(
	'/title/:section_title',
	async ({ params: { section_title } }, res) => {
		try {
			const section = await Section.find({
				title: section_title
			});
			if (!section.length) {
				return res.json({ msg: 'No sections by this name' });
			}
			return res.json(section);
		} catch (err) {
			return res.status(500).json({ msg: 'Server error' });
		}
	}
);

router.delete('/delete/:id', async (req, res) => {
	try {
		const section = await Section.findById(req.params.id);

		if (!section) {
			return res.json({ msg: 'Section not found' });
		}

		await section.remove();

		res.json({ msg: 'Section removed' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

router.put('/update/:id', parser.single('image'), async (req, res) => {
	try {
		const section = await Section.findById(req.params.id);

		if (!section) {
			return res.json({ msg: 'section not found' });
		}

		const title = req.body.title || section.title;
		const image = req.file ? req.file.path : section.image;

		await Section.findByIdAndUpdate(req.params.id, {
			title: title,
			image: image
		});

		res.json({ msg: 'Section updated' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

module.exports = router;
