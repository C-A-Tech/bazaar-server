const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const parser = require('../middleware/cloudinary.config');

const Product = require('../models/Product');

router.get('/', async (req, res) => {
	let products = await Product.find();
	res.json(products);
});

router.post(
	'/create',
	parser.single('image'),
	[
		check('name', 'name required').not().isEmpty(),
		// check('description', 'description required').not().isEmpty(),
		check('user', 'user id required').not().isEmpty(),
		check('section', 'section id required').not().isEmpty(),
		check('stall', 'stall id required').not().isEmpty()
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ msg: errors.array() }).status(400);
		}

		const image = req.file.path

		const product = new Product({
			name: req.body.name,
			description: req.body.description,
			user: req.body.user,
			section: req.body.section,
			stall: req.body.stall,
			price: req.body.price,
			image
		});
		try {
			await product.save();
			res.json({ msg: 'product created' });
		} catch (err) {
			res.status(400).json({ msg: `${err.keyValue.name} already exists` });
		}
	}
);

router.get('/user/:user_id', async ({ params: { user_id } }, res) => {
	try {
		const products = await Product.find({
			user: user_id
		});
		if (!product.length) {
			return res.json({ msg: 'No product' });
		}

		return res.json(products);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server error' });
	}
});

router.get('/section/:section_id', async ({ params: { section_id } }, res) => {
	try {
		const products = await product.find({
			section: section_id
		});
		if (!products.length) {
			return res.json({ msg: 'No products for this section' });
		}

		return res.json(products);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server error' });
	}
});

router.get('/stall/:stall_id', async ({ params: { stall_id } }, res) => {
	try {
		const products = await product.find({
			stall: stall_id
		});
		if (!products.length) {
			return res.json({ msg: 'No products for this stall' });
		}

		return res.json(products);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server error' });
	}
});

module.exports = router;
