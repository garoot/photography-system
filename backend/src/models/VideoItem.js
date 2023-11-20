const mongoose = require('mongoose');

const videoItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Add other fields as needed
});

const VideoItem = mongoose.model('VideoItem', videoItemSchema);

module.exports = VideoItem;
