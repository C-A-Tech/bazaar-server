const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to bazaar api'));

module.exports = router;
