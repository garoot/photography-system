let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();
const {v4: uuidv4} = require('uuid')
const photoControllers = require('../controllers/photographer.controllers')


const DIR = './public'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, uuidv4() + '_' + filename)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed'))
        }
    }
})

const Photo = require('../models/photographer.models')

// create
router.post('/upload', 
    upload.array('imgCollection', 6), 
    photoControllers.uploadPhotos
)
// find all
router.get("/", photoControllers.findAllPhotos)
// find Photo by its propert: userID
router.get("/:id", photoControllers.findUserPhotos)
// delete Photo by its property: userID
router.delete('/delete/:id', photoControllers.deleteUserPhotos)

module.exports = router
