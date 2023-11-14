const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');

// Route to compare and authenticate the password
router.post('/authenticate', authenticate);

module.exports = router;
