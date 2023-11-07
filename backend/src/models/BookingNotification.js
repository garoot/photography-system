const mongoose = require('mongoose');

const bookingNotificationSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['sent', 'received', 'read']
    }
  // Add more fields as necessary
});

module.exports = mongoose.model('BookingNotification', bookingNotificationSchema);
