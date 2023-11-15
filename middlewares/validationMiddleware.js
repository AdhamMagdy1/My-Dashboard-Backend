const { validationResult } = require('express-validator');
const { AppError } = require('../utils/error');

// Validation middleware to handle errors and send a JSON response
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If there are validation errors, create and return a custom error
    const error = new AppError(
      'Validation failed. Check the provided data.',
      400
    );
    error.validationErrors = errors.array(); // Attach validation errors to the custom error
    return next(error);
  }

  // If there are no validation errors, continue to the next middleware or route
  next();
};

module.exports = validationMiddleware;
