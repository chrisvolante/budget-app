const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const transactionRoutes = require('./transactions/transactions.routes');
const accountsRoutes = require('./accounts/accounts.routes');
const budgetsRoutes = require('./budgets/budgets.routes');

const { PORT, HTTP_STATUS_CODES } = require('./config.js');

let app = express();

// Telling the app that it will accept and send JSON data.
app.use(bodyParser.json());

// Will log common elements in HTTP requests.
app.use(morgan('common'));

// To Do Config Routes
app.use('/transactions', transactionRoutes);
app.use('/accounts', accountsRoutes);
app.use('/budgets', budgetsRoutes);

const databaseUrl = 'mongodb://admin:password1@ds137003.mlab.com:37003/budget-app-database';
const port = 8080;

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useNewUrlParser: true }, error => {
      if (error) {
        return reject(error);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(error => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(databaseUrl, port).catch(err => console.error(err));
};



app.listen(3000, () => {
    console.log('server is running in port 3000.')
});
