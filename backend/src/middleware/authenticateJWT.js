
const jwt = require('jsonwebtoken');
const secret = "your-secret-key"

function verifyAndAuthorize(req, res, next) {
    // check for the authorization header
    const bearerHeader = req.headers['Authorization'] || req.headers['authorization'];

    // if the header exists, try to verify the JWT
    if (typeof bearerHeader !== 'undefined') {
        // extracting the token from the Bearer prefix
        const bearerToken = bearerHeader.split(' ')[1];

        jwt.verify(bearerToken, secret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            // attach userId from the decoded JWT to the request
            req.userId = decoded.id;

            // move on to the next route handler
            next();
        });

    } else {
        res.status(403).json({ message: 'Token not provided' });
    }
};

module.exports = verifyAndAuthorize;


// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     // ... authentication middleware logic
//     const authHeader = req.headers.authorization;

//     if (authHeader) {
//         const token = authHeader.split(' ')[1];
    
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if (err) {
//             return res.sendStatus(403); // Invalid token
//             }
    
//             req.user = user;
//             next();
//         });
//     } else {
//       res.sendStatus(401); // No token provided
//     }
// };
