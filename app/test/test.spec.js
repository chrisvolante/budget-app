const mocha = require('mocha');
const chai = require('chai');
const chai_http = require('chai-http');
const mongoose = require('mongoose');

const { PORT, HTTP_STATUS_CODES, MONGO_URL, TEST_MONGO_URL } = require('../config.js');
const { app, startServer, stopServer } = require('../server.js');
const expect = chai.expect;

let TOKEN;
let USER_ID;

chai.use(chai_http);

function createUser() {
  let testUser = { name:"test-name", email: "test-email@email.com", username: "test-username", password: "password1" };

  return new Promise ((resolve, reject) => {
    chai.request(app)
      .post('/users/')
      .send(testUser)
      .then(response => {
        loginUser()
          .then(() => {
            resolve();
          })
      })
      .catch(error => {
        reject(error)
      });
  });
};

function loginUser() {
  let loginUser = { username: "test-username", password: "password1" };

  return new Promise ((resolve, reject) => {
    chai.request(app)
      .post('/auth/login')
      .send(loginUser)
      .then(response => {
        TOKEN = response.body.data.jwtToken;
        USER_ID = response.body.data.user.id;
        resolve();
      })
      .catch(error => {
        reject(error);
      })
  });
};

describe("transactions-test", function() {
  before(function(done) {
    startServer(true)
      .then(response => {
        createUser()
          .then(() => {
            done();
          })
      })
  })
  after(() => {
    mongoose.connect.dropDatabase();
    stopServer();
  })
  it("post-transaction-should-save", () => {
    let res;
    return chai.request(app)
      .post('/transactions/')
      .send({ jwtToken: TOKEN, newTransaction: { 
        payee: "test-payee",
        amount: 102,
        budgetsCategory: "test-budget",
        accountsName: "test-account"
       }
      })
      .then(_res => {
        res = _res;
        expect(res).to.have.status(200)
      })
  })
})