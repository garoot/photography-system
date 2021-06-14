const mongoose = require('mongoose')


const PhotoSchema = new mongoose.Schema({
    imgCollection: {
        type: Array
    },
    userID: String,
}, {timestamps:true, collection:'photos'}
)

const Photo = mongoose.model('Photo', PhotoSchema)

module.exports = Photo