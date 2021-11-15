const {Booking} = require('../models/booking.models')

// GET
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

module.exports.createBooking = (req, res) => {
    const booking = new Booking({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        date: req.body.date,
        notes: req.body.notes,
    })
    booking.save()
    .then(result => {
        res.status(201).json({
            message: 'instance created successfully',
            result: result
        })
    })
    .catch(err => res.json(err));
}
// create booking
// edit booking
// delete booking