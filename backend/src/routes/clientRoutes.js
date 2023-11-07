// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/:id', clientController.getClient);
// Define other routes (POST, PUT, DELETE) and link them to the corresponding controller methods

module.exports = router;
