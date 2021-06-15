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
	parser.array('image'),
	[
		check('name', 'name required').not().isEmpty(),
		check('description', 'description required').not().isEmpty(),
		check('price', 'price required').not().isEmpty(),
		check('user', 'user id required').not().isEmpty(),
		check('section', 'section id required').not().isEmpty(),
		check('stall', 'stall id required').not().isEmpty()
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ msg: errors.array() });
		}
		const images = []
		req.files.forEach(file => images.push(file.path));

		const product = new Product({
			name: req.body.name,
			description: req.body.description,
			user: req.body.user,
			section: req.body.section,
			stall: req.body.stall,
			price: req.body.price,
			image: images
		});
		try {
			await product.save();
			return res.json({ msg: 'product created' });
		} catch (err) {
			return res.json({ msg: 'This product already exists' });
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

router.delete('/delete/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ msg: 'product not found' });
		}

		await product.remove();

		res.json({ msg: 'Product removed' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

router.put('/update/:id', parser.single('image'), async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.json({ msg: 'product not found' });
		}

		const name = req.body.name || product.name;
		const description = req.body.description || product.description;
		const price = req.body.price || product.price;
		const image = req.file ? req.file.path : product.image;

		await Product.findByIdAndUpdate(req.params.id, {
			name: name,
			description: description,
			price: price,
			image: image
		});

		res.json({ msg: 'product updated' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

module.exports = router;
