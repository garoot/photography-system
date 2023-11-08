const { signup } = require('../../src/controllers/authController');
const User = require('../../src/models/User');
const { mockRequest, mockResponse } = require('jest-mock-extended');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


jest.mock('../../src/models/User', () => {
    return jest.fn().mockImplementation(() => {
        return {
            save: jest.fn()
        };
    });
});

describe('AuthController Tests', () => {
    beforeEach(() => {
        User.mockClear();
    });

    it('signup creates a new user and returns a JWT token', async () => {
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

  // ... additional tests ...
});
