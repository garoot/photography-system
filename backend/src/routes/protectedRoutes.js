
const express = require('express');
const router = express.Router();
const multer = require('multer');
const portfolioController = require('../controllers/portfolioController');

// Assuming authenticateJWT is a middleware that validates the JWT
const verifyAndAuthorize = require('../middleware/authenticateJWT');

const path = require('path');

// Configure multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/'); // Path to store the files
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


// Protected CRUD routes using controller functions
router.post('/portfolio-items', verifyAndAuthorize, upload.single('file'), portfolioController.createPortfolioItem);
router.put('/portfolio-items/:id', verifyAndAuthorize, upload.single('file'), portfolioController.updatePortfolioItem);
// router.get('/portfolio-items', verifyAndAuthorize, portfolioController.getPortfolioItems);
// router.get('/portfolio-items/:id', verifyAndAuthorize, portfolioController.getPortfolioItem);
router.delete('/portfolio-items/:id', verifyAndAuthorize, portfolioController.deletePortfolioItem);
router.delete('/portfolio-items', verifyAndAuthorize, portfolioController.deleteAllPortfolioItems);


module.exports = router;
