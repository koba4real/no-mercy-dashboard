const jwt = require('jsonwebtoken');
const User = require('../models/User'); // We might need the User model later

const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 1. Extract token from header ('Bearer TOKEN_STRING')
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token using the secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Get user ID from the decoded payload (assuming structure { user: { id: '...' } })
            // Attach user ID to the request object for later use in route handlers
            // You could also fetch the full user object here if needed often,
            // but for just fetching the profile, the ID is enough.
            req.userId = decoded.user.id; // Make sure 'user.id' matches your payload structure

            next(); // Token is valid, proceed to the next middleware or route handler

        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' }); // 401 Unauthorized
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' }); // 401 Unauthorized
    }
};

module.exports = { protect };