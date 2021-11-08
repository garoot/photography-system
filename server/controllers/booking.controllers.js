const {Booking} = require('../models/booking.models')

module.exports.getAllBookings = (req,res) => {
    Booking.find()
        .then(data => {
            res.status(200).json({
                message: "Bookings retrieved successfully",
                bookings: data
            })
        })
        .catch(err => res.json({error:err}))
}

// create booking
// edit booking
// delete booking