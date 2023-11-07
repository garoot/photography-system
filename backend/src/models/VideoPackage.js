const mongoose = require('mongoose');

const videoPackageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
  // Add more fields as necessary
});

module.exports = mongoose.model('VideoPackage', videoPackageSchema);
