// Exports and defines Port number, status codes, mongodb urls, and JSON webtoken secret/expiry.
module.exports = {
    PORT: process.env.PORT || 8080,
    HTTP_STATUS_CODES: {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },
    MONGO_URL: process.env.MONGO_URL || 'mongodb://admin:password1@ds137003.mlab.com:37003/budget-app-database',
    TEST_MONGO_URL: process.env.TEST_MONGO_URL || 'mongodb://admin:password1@ds253713.mlab.com:53713/test-budget-app-database',
    JWT_SECRET: process.env.JWT_SECRET || 'default',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};