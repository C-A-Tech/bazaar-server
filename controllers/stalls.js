const express = require('express');
const router = express.Router();

const Stall = require('../models/Stall');

router.get('/', (req, res) => {
  res.send("stalls page")
})

router.post('/create', async (req, res) => {
  const stall = new Stall({
    name: req.body.name,
    user: req.body.user
  })
  try {
    await stall.save()
    res.json({msg: "Stall created"})
  } catch(err) {
    res.send(err)
  }
})

module.exports = router;