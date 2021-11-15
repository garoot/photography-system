const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    notes: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true, collection: 'bookings'}
)

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = {Booking}