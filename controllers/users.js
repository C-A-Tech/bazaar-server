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






	res.send('hello');
});

module.exports = router;
