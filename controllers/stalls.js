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
			return res.json({ msg: errors.array() }).status(400);
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
			res.json({ msg: `${err.keyValue.name} already exists` }.status(400));
		}
	}
);

router.get(
  '/user/:user_id',
  async ({ params: { user_id } }, res) => {
    try {
      const stalls = await Stall.find({
        user: user_id
      })
      if (!stalls.length){
				return res.json({ msg: 'No stalls'})
			}

      return res.json(stalls);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
	}
	);

	router.get(
		'/section/:section_id',
		async ({ params: { section_id } }, res) => {
			try {
				const stalls = await Stall.find({
					section: section_id
				})
				if (!stalls.length){
					return res.json({ msg: 'No stalls for this section' })
				}
	
				return res.json(stalls);
			} catch (err) {
				console.error(err.message);
				return res.status(500).json({ msg: 'Server error' });
			}
		}
		);
	

module.exports = router;
