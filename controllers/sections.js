const express = require('express');
const router = express.Router();


const Section = require('../models/Section');

router.get('/', async (req, res) => {
  let sections = await Section.find()
  res.json(sections)
})

router.post('/', async (req, res) => {
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