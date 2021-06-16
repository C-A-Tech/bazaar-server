const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const parser = require('../middleware/cloudinary.config');

const Stall = require('../models/Stall');

router.get('/', async (req, res) => {
	let stalls = await Stall.find();
	res.json(stalls);
});

router.post(
	'/create',
	parser.single('image'),
	[
		check('name', 'name required').not().isEmpty(),
		check('user', 'user id required').not().isEmpty(),
		check('section', 'section id required').not().isEmpty()
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ msg: errors.array() });
		}

		const image = req.file.path;

		const stall = new Stall({
			name: req.body.name,
			user: req.body.user,
			section: req.body.section,
			image
		});
		try {
			await stall.save();
			res.json({ msg: 'Stall created' });
		} catch (err) {
			return res.json({ msg: 'This stall already exists' });
		}
	}
);

router.get('/user/:user_id', async ({ params: { user_id } }, res) => {
	try {
		const stalls = await Stall.findOne({
			user: user_id
		});
		if (!stalls.length) {
			return res.json({ msg: 'No stalls' });
		}

		return res.json(stalls);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server error' });
	}
});

router.get('/stall/:stall_id', async ({ params: { stall_id } }, res) => {
	try {
		const stalls = await Stall.find({
			_id: stall_id
		});
		if (!stalls.length) {
			return res.json({ msg: 'No stalls' });
		}

		return res.json(stalls);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server error' });
	}
});

router.get('/section/:section_id', async ({ params: { section_id } }, res) => {
	try {
		const stalls = await Stall.find({
			section: section_id
		});
		if (!stalls.length) {
			return res.json({ msg: 'No stalls for this section' });
		}

		return res.json(stalls);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server error' });
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		const stall = await Stall.findById(req.params.id);

		if (!stall) {
			return res.json({ msg: 'stall not found' });
		}

		await stall.remove();

		res.json({ msg: 'Stall removed' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

router.put('/update/:id', parser.single('image'), async (req, res) => {
	try {
		const stall = await Stall.findById(req.params.id);

		if (!stall) {
			return res.json({ msg: 'stall not found' });
		}

		const name = req.body.name || stall.name;
		const image = req.file ? req.file.path : stall.image;

		await Stall.findByIdAndUpdate(req.params.id, {
			name: name,
			image: image
		});

		res.json({ msg: 'Stall updated' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

module.exports = router;
