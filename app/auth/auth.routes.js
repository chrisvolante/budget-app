const express = require('express');
const authController = require('./auth.controller');
const { localPassportMiddleware, jwtPassportMiddleware } = require('./auth.strategies');

let router = express.Router();

// User Login.
router.post('/login', localPassportMiddleware, authController.userLogin);
// User refresh.
router.post('/refresh', jwtPassportMiddleware, authController.userRefresh);

module.exports = router;