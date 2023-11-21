// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const clientRoutes = require('./routes/clientRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticateJWT = require('./middleware/authenticateJWT');
const protectedRoutes = require('./routes/protectedRoutes'); // make sure the path is correct
const portfolioController = require('./controllers/portfolioController');
const path = require('path');
const cors = require('cors');




// import other routes
const app = express();
app.use(cors());


app.use(express.json()); // For parsing application/json
app.use('/clients', clientRoutes);
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/public', express.static('public'));



// Use other routes

// Connect to MongoDB
// Replace 'yourDatabaseName' with the actual name of your database
mongoose.connect('mongodb://0.0.0.0/photography-db')
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Public routes
app.use('/api/auth', authRoutes);
// Public routes for portfolio items
app.get('/portfolio-items', portfolioController.getPortfolioItems);
app.get('/portfolio-items/:id', portfolioController.getPortfolioItem);
app.get('/portfolio-videos', portfolioController.getVideoItems);

// Protected routes
app.use('/api', authenticateJWT, protectedRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});