// Imports dependencies.
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const { PORT, HTTP_STATUS_CODES, MONGO_URL, TEST_MONGO_URL } = require('./config.js');

// Imports routers from files.
const transactionRoutes = require('./transactions/transactions.routes');
const accountsRoutes = require('./accounts/accounts.routes');
const budgetsRoutes = require('./budgets/budgets.routes');
const authRoutes = require('./auth/auth.routes');
const usersRoutes = require('./users/users.routes');
const { localStrategy, jwtStrategy } = require('./auth/auth.strategies');

let server;
const app = express();
passport.use(localStrategy); // Configure Passport to use our localStrategy when receiving Username + Password combinations
passport.use(jwtStrategy); // Configure Passport to use our jwtStrategy when receving JSON Web Tokens

// MIDDLEWARE.
app.use(bodyParser.json()); // Will tell the app that it will accept and send JSON data.
app.use(morgan('common')); // Will log common elements in HTTP requests.
app.use('/', express.static('public')); // Will serve static files that is the Front-End.

// Re-directs calls to appropriate routes.
app.use('/transactions', transactionRoutes);
app.use('/accounts', accountsRoutes);
app.use('/budgets', budgetsRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

// In case we make a HTTP request that is unhandled by our Express server, we return a 404 status code and the message "Not Found."
app.use('*', function (request, response) {
  response.status(HTTP_STATUS_CODES.NOT_FOUND).json({
    error: 'Not Found.'
  });
});

module.exports = {
  app,
  startServer,
  stopServer
};

// Function will be asynchronous and return a promise that'll reject/resolve depending if the process is succesful.
function startServer(testEnv) {
  return new Promise((resolve, reject) => {
    let mongoUrl;

    // Checks to see if we want to do testing on the test server.
    if (testEnv) {
      mongoUrl = TEST_MONGO_URL;
    } else {
      mongoUrl = MONGO_URL;
    };
    // Step 1: Attempt to connect to MongoDB with mongoose.
    mongoose.connect(mongoUrl, { useNewUrlParser: true }, error => {
      if (error) {
        // Step 2A: If there is an error starting mongo, log error, reject promise and stop code execution.
        console.error(error);
        return reject(error);
      } else {
        // Step 2B: Start Express server.
        server = app.listen(PORT, () => {
          // Step 3A: Log success message to console and resolve promise.
          console.log(`Express server listening on http://localhost:${PORT}`);
          resolve();
        }).on('error', error => {
          // Step 3B: If there was a problem starting the Express server, disconnect from MongoDB immediately, log error to console and reject promise.
          mongoose.disconnect();
          console.error(error);
          reject(error);
        });
      };
    });
  });
};

function stopServer() {
  // Step 1: Disconnect from the MongoDB database using Mongoose.
  return mongoose
    .disconnect()
    .then(() => new Promise((resolve, reject) => {
      // Step 2: Shut down the ExpressJS server.
      server.close(error => {
        if (error) {
          // Step 3A: If an error ocurred while shutting down, print out the error to the console and reject promise.
          console.error(error);
          return reject(error);
        } else {
          // Step 3B: If the server shutdown correctly, log a success message, and resolve.
          console.log('Express server stopped.');
          resolve();
        };
      });
    }));
};