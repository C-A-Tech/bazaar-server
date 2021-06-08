const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

router.post(
  '/signup', 
  (req, res) => {
	const { name, email, password, dob } = req.body;

	user = new User({
		name,
		email,
		password,
    dob
	});


  user.save();

	res.send({msg: 'user has been saved successfully'});
});

module.exports = router;
