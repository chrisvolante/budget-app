module.exports = {
    // We use the OR ("||") operator to check if the PORT environment variable exists. If not, we default to 8080
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
    MONGO_URL: process.env.MONGO_URL || 'mongodb://admin:password1@ds137003.mlab.com:37003/budget-app-database'
};