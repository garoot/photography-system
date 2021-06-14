const Photo = require('../models/photographer.models')

module.exports.uploadPhotos = (req,res) => {
    const reqFiles = []
    const url = req.protocol + '://' + req.get('host')
    for(var i =0; i<req.files.length; i++){
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }
    const photo = new Photo({
        imgCollection: reqFiles,
        userID: req.body.userID
    })

    photo.save()
        .then(result => {
            res.status(201).json({
                message: "Done upload!",
                photosCreated: {
                    _id: result._id,
                    imgCollection: result.imgCollection,
                    userID: result.userID
                },
            })
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({
                error: err
            })
        })
}

module.exports.findAllPhotos = (req,res) => {
    Photo.find()
        .then(data=> {
            res.status(200).json({
                message: "Photo list retrieved successfully!",
                photos: data
            })
        })
        .catch(err=> res.json({error:err}))
}

module.exports.findUserPhotos = (req,res) => {
    Photo.findOne({'userID': req.params.id})
        .then(data=> {
            res.status(200).json({
                message: "Photo list retrieved successfully!",
                photos: data
            })
        })
        .catch(err => res.json({error: err}))
}

module.exports.deleteUserPhotos = (req,res) => {
    Photo.findOneAndDelete({'userID': req.params.id})
        .then(response => res.json({response: response}))
        .catch(err => res.status(400).json({error: err}))
}