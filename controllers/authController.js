const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/error');

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const authenticate = (req, res, next) => {
  const { password } = req.body;

  if (!password || !comparePassword(password, process.env.HASHED_PASSWORD)) {
    const error = new AppError('Invalid password', 401);
    return next(error);
  }

  const token = jwt.sign(
    { userId: 'your_unique_identifier' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
};

module.exports = authenticate;
