const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRY } = require('../config.js');

function createJwtToken(user) {
    return jwt.sign({ user }, JWT_SECRET, {
        subject: user.username,
        expiresIn: JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

// User Login.
exports.userLogin = (request, response) => {
    const user = request.user.serialize();
    const jwtToken = createJwtToken(user);
    response.json({ jwtToken, user });
};

// User refresh.
exports.userRefresh = (request, response) => {
    const user = request.user;
    const jwtToken = createJwtToken(user);
    response.json({ jwtToken, user });
};