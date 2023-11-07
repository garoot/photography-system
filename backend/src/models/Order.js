const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotoPackage', // or 'VideoPackage', if you have separate packages for photo and video
        required: true
    },
    date: {
        type: Date,
        required: true
    }
  // Add more fields as necessary
});

module.exports = mongoose.model('Order', orderSchema);
