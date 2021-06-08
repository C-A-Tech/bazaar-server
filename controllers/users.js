const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

router.post('/signup', (req, res) => {
  console.log(req.body)
  // const { name } = req.body;
  // console.log(name)







	// res.send(req.body.json());
});

module.exports = router;
