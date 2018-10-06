const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router();

router.route('/login').post(authCtrl.login);
router.route('/register').post(authCtrl.register);

module.exports = router;
