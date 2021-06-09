const express = require('express');
const router = express.Router();

const Stall = require('../models/Stall');

router.get('/', async (req, res) => {
  let stalls = await Stall.find()
  res.json(stalls)
})

router.post('/create', async (req, res) => {
  const stall = new Stall({
    name: req.body.name,
    user: req.body.user,
    section: req.body.section
  })
  try {
    await stall.save()
    res.json({msg: "Stall created"})
  } catch(err) {
    res.status(400).json({ msg: `${err.keyValue.name} already exists` });
  }
})

module.exports = router;