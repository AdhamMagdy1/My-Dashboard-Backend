const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/error');

// Middleware function to authenticate user requests
const authenticate = (req, res, next) => {
  try {
    // 1. Get the token from the request header
    const token = req.header('Authorization');

    // 2. If no token is provided, send an error response
    if (!token) {
      throw new AppError('Authentication failed. No token provided.', 401);
    }

    // 3. Verify the token and extract the user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // // 4. Attach the user data (decoded) to the request for use in route handlers
    // req.user = decoded;

    // 5. Continue to the next middleware or route handler
    next();
  } catch (error) {
    next(new AppError('Invalid token.', 401)); // Pass any errors to the error handling middleware
  }
};

module.exports = authenticate;
