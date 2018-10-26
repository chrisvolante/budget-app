const express = require('express');
const jwt = require('jsonwebtoken');

const { localPassportMiddleware, jwtPassportMiddleware } = require('./auth.strategies');
const { JWT_SECRET, JWT_EXPIRY } = require('../config.js');

const authRouter = express.Router();

function createJwtToken(user) {
    return jwt.sign({ user }, JWT_SECRET, {
        subject: user.username,
        expiresIn: JWT_EXPIRY,
        algorithm: 'HS256'
    });
}

authRouter.post('/login', localPassportMiddleware, (request, response) => {
    const user = request.user.serialize();
    const jwtToken = createJwtToken(user);
    response.json({ jwtToken, user });
});

authRouter.post('/refresh', jwtPassportMiddleware, (request, response) => {
    const user = request.user;
    const jwtToken = createJwtToken(user);
    response.json({ jwtToken, user });
});

module.exports = { authRouter };