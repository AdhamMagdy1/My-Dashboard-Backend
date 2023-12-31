const express = require('express');
const router = express.Router();
const authenticate = require('../controllers/authController');

// Route to compare and authenticate the password
router.post('/authenticate', authenticate);

module.exports = router;
