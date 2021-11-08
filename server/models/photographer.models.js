const mongoose = require('mongoose')

// add clientName
const PhotoSchema = new mongoose.Schema({
    imgCollection: {
        type: Array
    },
    userID: String,
    clientName: String,
    clientEmail: String,
    galleryOrder: Number,
    albumName: {
        type: String,
        required: [true, 'Album name is required'],
        unique: [true, 'this name exists']
    },
    // timestamps: created date, collection: 
}, {timestamps:true, collection:'photos'}
)

const PhotographerSchema = new mongoose.Schema({
    username: {
        type: String,
        default: "admin@admin.com",
        unique: [true, "username already exists"],
        required: [true, "username is required"]
    },
    role: {
        type: String,
        default: 'admin',
        required: [true, "role is required"]
    },
    password: {
        type: String,
        default: "adminstrongpassword",
        required: [true, "password is required"]
    }
})

const Photographer = mongoose.model('Photographer', PhotographerSchema)
const Photo = mongoose.model('Photo', PhotoSchema)

module.exports = {Photo, Photographer}