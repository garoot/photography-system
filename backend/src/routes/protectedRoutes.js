const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Assuming authenticateJWT is a middleware that validates the JWT
const verifyAndAuthorize = require('../middleware/authenticateJWT');

// Protected CRUD routes using controller functions
router.post('/portfolio-items', verifyAndAuthorize, portfolioController.createPortfolioItem);
router.get('/portfolio-items', verifyAndAuthorize, portfolioController.getPortfolioItems);
router.get('/portfolio-items/:id', verifyAndAuthorize, portfolioController.getPortfolioItem);
router.put('/portfolio-items/:id', verifyAndAuthorize, portfolioController.updatePortfolioItem);
router.delete('/portfolio-items/:id', verifyAndAuthorize, portfolioController.deletePortfolioItem);

module.exports = router;
