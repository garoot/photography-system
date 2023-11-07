// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const clientRoutes = require('./routes/clientRoutes');
// import other routes
const app = express();

app.use(express.json()); // For parsing application/json
app.use('/clients', clientRoutes);
// Use other routes

// Connect to MongoDB
// Replace 'yourDatabaseName' with the actual name of your database
mongoose.connect('mongodb://0.0.0.0/photography-db')
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
