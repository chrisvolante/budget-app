// Import dependencies.
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const { HTTP_STATUS_CODES } = require('../app/config');
const { startServer, stopServer, app } = require('../app/server.js');
const { User } = require('../app/users/users.model.js');

const expect = chai.expect; // So we can do "expect" instead of always typing "chai.expect"
chai.use(chaiHttp); // implements chai http plugin

describe('Integration tests for: /users', function () {
    let testUser;

    before(function () {
      return startServer(true);
    });

    beforeEach(function () {
      testUser = createFakerUser();
      // Create a randomized test user.
      return User.create(testUser)
        .then(() => { })
        .catch(err => {
          console.error(err);
        });
    });

    afterEach(function () {
      return new Promise((resolve, reject) => {
        // Deletes the entire database.
        mongoose.connection.dropDatabase()
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            console.error(err);
            reject(err);
          });
      });
    });

    after(function () {
      return stopServer();
    });

    it('Should return all users', function () {
      return chai.request(app)
        .get('/users/all')
        .then(response => {
          expect(response).to.have.status(HTTP_STATUS_CODES.OK);
          expect(response).to.be.json;
          expect(response.body).to.be.a('array');
          expect(response.body).to.have.lengthOf.at.least(1);
          expect(response.body[0]).to.include.keys('id', 'name', 'username', 'email');
          expect(response.body[0]).to.not.include.keys('password');
        });
    });

    it('Should return a specific user', function () {
      let foundUser;
      return User.find()
        .then(users => {
          foundUser = users[0];

          return chai.request(app)
            .get(`/users/${foundUser.id}`)
              .then(response => {
                expect(response).to.have.status(HTTP_STATUS_CODES.OK);
                expect(response).to.be.json;
                expect(response.body).to.be.a('object');
                expect(response.body.id).to.equal(foundUser.id);
              });
          })
    });

    it('Should create a new user', function () {
      let newUser = createFakerUser();
      return chai.request(app)
        .post('/users')
        .send(newUser)
        .then(response => {
          expect(response).to.have.status(HTTP_STATUS_CODES.CREATED);
          expect(response).to.be.json;
          expect(response.body).to.be.a('object');
          expect(response.body).to.include.keys('id', 'name', 'username', 'email');
          expect(response.body.name).to.equal(newUser.name);
          expect(response.body.email).to.equal(newUser.email);
          expect(response.body.username).to.equal(newUser.username);
        });
    });

  function createFakerUser() {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      username: `${faker.lorem.word()}${faker.random.number(100)}`,
      password: faker.internet.password(),
      email: faker.internet.email()
    };
  };

});