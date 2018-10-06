const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION;

if (!jwtSecret) {
  throw new Error('Set environment variable JWT_SECRET');
}

if (!jwtExpiration) {
  throw new Error('Set environment variable JWT_EXPIRATION');
}

module.exports.sign = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
  }, jwtSecret, { expiresIn: jwtExpiration });
};
