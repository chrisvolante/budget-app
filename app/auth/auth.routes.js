// Imports dependencies.
const express = require('express');

// Imports implementation details for User login and refresh.
const authController = require('./auth.controller');

// Imports passport middleware from auth.strategies.js file.
const { localPassportMiddleware, jwtPassportMiddleware } = require('./auth.strategies');

let router = express.Router();

// User Login.
router.post('/login', localPassportMiddleware, authController.userLogin);

// User refresh.
router.post('/refresh', jwtPassportMiddleware, authController.userRefresh);

// Exports router to be used in server.js.
module.exports = router;