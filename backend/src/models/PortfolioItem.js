const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['image', 'video']
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    description: {
        type: String,
        // This field is optional and will be used for videos
    },
    // You can include other common fields like upload date, tags, etc.
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PortfolioItem = mongoose.model('PortfolioItem', portfolioItemSchema);

module.exports = PortfolioItem;
