const { signup, login } = require('../../src/controllers/authController');
const User = require('../../src/models/User');
const { mockRequest, mockResponse } = require('jest-mock-extended');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock the User model
jest.mock('../../src/models/User', () => {
    return jest.fn().mockImplementation(() => {
            return {
                save: jest.fn().mockResolvedValue(true),
                comparePassword: jest.fn()
            };
    });
});
    
// Mock bcrypt and jwt
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

// ---------------- testing the signup -----------------------
describe('AuthController - Signup', () => {
    beforeEach(() => {
        User.mockClear();
    });

    it('should create a new user and return a JWT token', async () => {
        const req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                password: 'password123',
                role: 'client'
            }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        bcrypt.hash = jest.fn().mockResolvedValue('hashedpassword');
        jwt.sign = jest.fn().mockReturnValue('jsonwebtoken');

        User.findOne = jest.fn().mockResolvedValue(null);

        await signup(req, res);

        expect(User).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });
});


// ---------------- testing the login -----------------------
describe('AuthController - Login', () => {
    let mockReq, mockRes, mockNext;
    
    beforeEach(() => {
        mockReq = { body: { email: 'test@example.com', password: 'password123' } };
        mockRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        mockNext = jest.fn();
        
        // Clear mock calls
        User.mockClear();
        bcrypt.compare.mockClear();
        jwt.sign.mockClear();
        global.console.error = jest.fn();
    });
    
    it('should login successfully with correct credentials', async () => {
      // Mocking the database call
        const mockUser = {
            _id: 'user123',
            email: 'test@example.com',
            role: 'client',
            comparePassword: jest.fn().mockResolvedValue(true)
        };
        User.findOne = jest.fn().mockResolvedValue(mockUser);
    
        // Mocking the JWT token generation
        const mockToken = 'fake-jwt-token';
        jwt.sign.mockReturnValue(mockToken);
    
        await login(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Logged in successfully!',
            user: {
            id: mockUser._id,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role
            },
            token: mockToken
        });
    });
    
    it('should return error if user not found', async () => {
        User.findOne = jest.fn().mockResolvedValue(null);
        await login(mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.send).toHaveBeenCalledWith('Email not found');
    });
    
    it('should return error if password does not match', async () => {
        const mockUser = {
            comparePassword: jest.fn().mockResolvedValue(false)
        };
        User.findOne = jest.fn().mockResolvedValue(mockUser);
        await login(mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.send).toHaveBeenCalledWith('Invalid credentials');
    });
    
    it('should handle server errors', async () => {
        const error = new Error('Fake server error');
        User.findOne = jest.fn().mockRejectedValue(error);
        await login(mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith('Server error');
    });
    
    it('should handle exceptions thrown during password comparison', async () => {
        const mockUser = {
            comparePassword: jest.fn().mockRejectedValue(new Error('Error during password comparison'))
        };
        User.findOne = jest.fn().mockResolvedValue(mockUser);
        await login(mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith('Server error');
    });

    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks();
    });
    // Additional tests can be added to cover other scenarios, such as token generation errors, etc.
});