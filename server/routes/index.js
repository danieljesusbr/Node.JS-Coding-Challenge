const express = require('express');
const expressJwt = require('express-jwt');
const authRoute = require('./auth.route');
const profileRoute = require('./profile.route');
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) {
  throw new Error('Set environment variable JWT_SECRET');
}

const authMiddleware = expressJwt({ secret: process.env.JWT_SECRET });

router.use('/', authRoute);
router.use('/profile', authMiddleware, profileRoute);

module.exports = router;