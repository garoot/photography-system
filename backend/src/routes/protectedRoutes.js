
const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Assuming authenticateJWT is a middleware that validates the JWT
const verifyAndAuthorize = require('../middleware/authenticateJWT');

const { uploadImage, uploadImages, uploadVideo } = require('../middleware/uploadConfig');


// Protected CRUD routes using controller functions
router.post('/portfolio-items', verifyAndAuthorize, uploadImage.single('file'), portfolioController.createPortfolioItem);
router.put('/portfolio-items/:id', verifyAndAuthorize, uploadImage.single('file'), portfolioController.updatePortfolioItem);
router.post('/portfolio-items/bulk-update', verifyAndAuthorize, uploadImages, portfolioController.bulkUpdatePortfolioItems);
router.post('/portfolio-items/videos', verifyAndAuthorize, uploadVideo, portfolioController.createVideoItem);
router.delete('/portfolio-items/:id', verifyAndAuthorize, portfolioController.deletePortfolioItem);
router.delete('/portfolio-items', verifyAndAuthorize, portfolioController.deleteAllPortfolioItems);


module.exports = router;
