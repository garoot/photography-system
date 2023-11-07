const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log("in authRoutes.js")
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
