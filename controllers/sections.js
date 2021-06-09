const express = require('express');
const router = express.Router();

const Section = require('../models/Section');

router.get('/', (req, res) => {
  res.send("sections page")
})

module.exports = router