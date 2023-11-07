const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Other controller methods...

// Signup method
exports.signup = async (req, res) => {
    console.log("Creating user...")
    try {
        const { name, email, phone, password, role } = req.body;
        
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).send('Email already in use');
        }
        
        // Create a new user
        const user = new User({
            name,
            email,
            phone,
            password,
            role
        });
        
        // Save the user in the database
        await user.save();
        
        // Create a JWT token
        const token = jwt.sign(
        { userId: user._id, email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
        );
        
        // Send the token to the client
        res.status(201).json({
        message: 'User created',
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Email not found');
            return res.status(401).send('Email not found');
        }

        const isMatch = await user.comparePassword(password);
        const hashed_test = bcrypt.hash

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).send('Invalid credentials');
        }

        const token = generateToken(user);
        console.log('Login successful, token generated');
        res.status(200).json({
            message: 'Logged in successfully!',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }
};


const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
        );
};
