
const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Assuming authenticateJWT is a middleware that validates the JWT
const verifyAndAuthorize = require('../middleware/authenticateJWT');

const { uploadImage, uploadVideo } = require('../middleware/uploadConfig');


// Configure multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // const dir = req.body.type === 'video' ? 'public/videos' : 'public/uploads';
//         const dir = 'public/uploads';
//         cb(null, dir);
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });


// Protected CRUD routes using controller functions
router.post('/portfolio-items', verifyAndAuthorize, uploadImage.single('file'), portfolioController.createPortfolioItem);
router.put('/portfolio-items/:id', verifyAndAuthorize, uploadImage.single('file'), portfolioController.updatePortfolioItem);
router.post('/portfolio-items/videos', verifyAndAuthorize, uploadVideo, portfolioController.createVideoItem);
// router.get('/portfolio-items', verifyAndAuthorize, portfolioController.getPortfolioItems);
// router.get('/portfolio-items/:id', verifyAndAuthorize, portfolioController.getPortfolioItem);
router.delete('/portfolio-items/:id', verifyAndAuthorize, portfolioController.deletePortfolioItem);
router.delete('/portfolio-items', verifyAndAuthorize, portfolioController.deleteAllPortfolioItems);


module.exports = router;
