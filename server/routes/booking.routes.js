let express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();
const bookingControllers = require('../controllers/booking.controllers')

// gets all bookings
router.get("/", bookingControllers.getAllBookings)

module.exports = router
