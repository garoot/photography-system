const {Photo} = require('../models/photographer.models')
const fs = require('fs')
const { db } = require('../../../3. MERN/assignments/week9/day3/team-manager/server/models/players.models')

// create photos for gallery
module.exports.uploadPhotos = (req,res) => {
    const reqFiles = []
    const url = req.protocol + '://' + req.get('host')
    // creating paths for uploaded images and save in reqFiles[]
    for(var i =0; i<req.files.length; i++){
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }
    if(req.body.deletedFiles){
        let deletedFiles = []
        // if deletedFiles is Array
        if(Array.isArray(req.body.deletedFiles)){
            deletedFiles = req.body.deletedFiles
        }
        // else: push it to deletedFiles
        else{
            deletedFiles.push(req.body.deletedFiles)
        }
        console.log("deletedFiles:")
        console.log(deletedFiles)
        for(let i =0; i<deletedFiles.length; i++){
            let tmpFile = deletedFiles[i]
            let path = tmpFile.split("http://localhost:8000/public/")[1]
            fs.unlink("./public/"+path, err=>{
                if(err) console.log(err);
            })
        }
    }
    // if there is prev images, save them in prevCollection and concat reqFiles[]
    // console.log(req.body)
    
    if(req.body.prevCollection){
        console.log("req.body.prevCollection")
        let dbCollection = []
        Photo.find({albumName:'gallery'})
            .then(result =>  {
                // console.log(result[0].imgCollection)
                console.log("dbCollection:")
                dbCollection = [...result[0].imgCollection]
                console.log(dbCollection)
            })
            .catch(err => console.log(err))

        let prevCollection = []
        // if prevCollection is array:
        if(Array.isArray(req.body.prevCollection)){
            prevCollection = req.body.prevCollection
        }
        // else: push it to prevCollection
        else{
            prevCollection.push(req.body.prevCollection)
        }
        // console.log("reqFiles:")
        // console.log(reqFiles)
        console.log("prevCollection:")
        console.log(prevCollection)

        
        if(reqFiles.length>0){
            for(let i=0; i<reqFiles.length;i++){
                prevCollection.push(reqFiles[i])
                console.log("we have prevCollection")
            }
        }
        // findoneAndUpdate
        Photo.findOneAndUpdate({albumName: 'gallery'},
        {imgCollection: prevCollection}
        )
        .then(result => res.json({gallery: result}))
        .catch(err => res.json({error:err}))
    }
    else {

        const newPhoto = new Photo ({
            // imgCollection:  reqFiles,
            imgCollection:  reqFiles,
            userID: req.body.userID,
            albumName: req.body.albumName,
            // userID: req.body.userID
        })
        newPhoto.save()
        .then(result => {
            res.status(201).json({
                message: "Done upload!",
                photosCreated: {
                    _id: result._id,
                    imgCollection: result.imgCollection,
                    albumName: result.albumName,
                    userID: result.userID
                },
            })
        })
        .catch(err => {
            // console.log(err),
            res.status(500).json({
                error: err
            })
        })
    }

    // console.log(req.body.albumName)


    
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
    Photo.find({userID: "someuser"})
        .then(data=> {
            res.status(200).json({
                message: "Photo list retrieved successfully!",
                photos: data
            })
        })
        .catch(err => res.json({error: err}))
}
module.exports.findGalleryPhotos = (req,res) => {
    Photo.findOne({albumName: "gallery"})
        .then(data=> {
            res.status(200).json({
                message: "gallery Photo retrieved successfully!",
                gallery: data
            })
        })
        .catch(err => res.json({error: err}))
}

module.exports.deleteUserPhotos = (req,res) => {
    Photo.findOneAndDelete({'userID': req.params.id})
        .then(response => res.json({response: response}))
        .catch(err => res.status(400).json({error: err}))
}

module.exports.deletePhotosByAlbumName = (req,res) => {
    
    // let object = Photo.findOne({albumName:'gallery'})
    // if(!object){
    //     console.log(object)
    //     res.status(400).json({error:"no images to delete idiot!"})
    // }
    console.log(req.params.albumName)
        
    Photo.findOneAndDelete({'albumName': req.params.albumName})
        .then(response => {
            res.json({response: response})
            console.log("Hiiii")
            console.log(response.imgCollection)

            let imgCollection = []
            if(Array.isArray(response.imgCollection)){
                imgCollection = response.imgCollection
            }
            // else: push it to deletedFiles
            else{
                imgCollection.push(response.imgCollection)
            }
            // deleting from public folder
            for(let i = 0; i<imgCollection.length; i++){
                if(imgCollection[i]){
                    // console.log(i+":")
                    // console.log(JSON.stringify(imgCollection[i]))
                    let tmpFile = imgCollection[i]
                    console.log(tmpFile.split("http://localhost:8000/public/")[1])
                    let path = tmpFile.split("http://localhost:8000/public/")[1]
                    fs.unlink("./public/"+path, err=>{
                        if(err) console.log(err);
                    })
                }
            }
        })
        .catch(err => res.status(400).json({error: err}))
}

module.exports.updateGallery = async (req,res)=>{
    console.log(req.body.albumName)
    await Photo.findOneAndUpdate({albumName: req.body.albumName },
        {userID: 'new id'},
        {new: true, runValidators: true}
        )
        .then(result=> {
            // console.log(result)
            res.json({result:result})
        })
        .catch(err=> res.json({error:err}))
}