const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const transactionRoutes = require('./transactions/transactions.routes');
const accountsRoutes = require('./accounts/accounts.routes');
const budgetsRoutes = require('./budgets/budgets.routes');

const { PORT, MONGO_URL } = require('./config.js');

let app = express();

// Telling the app that it will accept and send JSON data.
app.use(bodyParser.json());

// Will log common elements in HTTP requests.
app.use(morgan('common'));

// To Do Config Routes
app.use('/transactions', transactionRoutes);
app.use('/accounts', accountsRoutes);
app.use('/budgets', budgetsRoutes);

let server;

function runServer(MONGO_URL, PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true }, error => {
      if (error) {
        return reject(error);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
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
  runServer(MONGO_URL, PORT).catch(err => console.error(err));
};



app.listen(3000, () => {
    console.log('server is running in port 3000.')
});
