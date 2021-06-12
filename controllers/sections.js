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

router.get('/title/:section_title', async ({ params: {section_title} }, res) => {
  try {
		const section = await Section.find({
		  title: section_title
		})
		if (!section.length){
			return res.json({ msg: 'No sections by this name' }).status(400)
		}
		return res.json(section)
	} catch (err) {
		return res.status(500).json({ msg: 'Server error' });
	}
})

module.exports = router;
