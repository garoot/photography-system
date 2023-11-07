// models/Client.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
    }
  // Add more fields as necessary
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        }
        next();
    });
    
    userSchema.methods.comparePassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

module.exports = mongoose.model('User', userSchema);
