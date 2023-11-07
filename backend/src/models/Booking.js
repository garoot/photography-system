const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
  // Add more fields as necessary
});

module.exports = mongoose.model('Booking', bookingSchema);
