const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');


const Section = require('../models/Section');

router.get('/', async (req, res) => {
  let sections = await Section.find()
  res.json(sections)
})

router.post('/', [
  check('title', 'title required').not().isEmpty()
],

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const section = new Section({
    title: req.body.title
  })
  try{
    await section.save()
    res.json({ msg: "section created" })
  } catch(err) {
    res.status(400).json({ msg: `${err.keyValue.title} already exists` });
  }
  
})

module.exports = router