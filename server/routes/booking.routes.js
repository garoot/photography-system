let express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();
const bookingControllers = require('../controllers/booking.controllers')

// gets all bookings
router.get('/get', bookingControllers.getAllBookings)
router.post('/create', bookingControllers.createBooking)


module.exports = router
