const multer = require('multer');
const path = require('path');

// Configuration for image uploads
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadImage = multer({ storage: imageStorage });

// Configuration for video uploads
const videoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'video') {
            cb(null, 'public/videos');
        } else if (file.fieldname === 'thumbnail') {
            cb(null, 'public/videos/thumbnails');
        }
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadVideo = multer({ storage: videoStorage }).fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]);

module.exports = { uploadImage, uploadVideo };
