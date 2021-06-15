const mongoose = require('mongoose')

// add clientName
const PhotoSchema = new mongoose.Schema({
    imgCollection: {
        type: Array
    },
    userID: String,
    clientName: String,
    clientEmail: String,
}, {timestamps:true, collection:'photos'}
)

const Photo = mongoose.model('Photo', PhotoSchema)

module.exports = Photo