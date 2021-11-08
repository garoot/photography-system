const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    }
}, {timestamps: true, collection: 'bookings'}
)

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = {Booking}