// Import dependencies.
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');
const faker = require('faker');

const { HTTP_STATUS_CODES, JWT_SECRET, JWT_EXPIRY } = require('../app/config.js');
const { startServer, stopServer, app } = require('../app/server.js');
const { User } = require('../app/users/users.model.js');

const expect = chai.expect; // So we can do "expect" instead of always typing "chai.expect"
chai.use(chaiHttp); // implements chai http plugin

describe('Integration tests for: /auth', function () {
  let testUser, jwtToken;

  before(function () {
      return startServer(true);
  });

  beforeEach(function () {
    testUser = createFakerUser();

    return User.hashPassword(testUser.password).then(hashedPassword => {
      // Create a randomized test user.
      return User.create({
        name: testUser.name,
        email: testUser.email,
        username: testUser.username,
        password: hashedPassword
      })
        .then(createdUser => {
          testUser.id = createdUser.id;

          jwtToken = jsonwebtoken.sign(
            {
              user: {
                id: testUser.id,
                name: testUser.name,
                email: testUser.email,
                username: testUser.username
              }
            },
            JWT_SECRET,
            {
              algorithm: 'HS256',
              expiresIn: JWT_EXPIRY,
              subject: testUser.username
            }
          );
        })
        .catch(err => {
          console.error(err);
        });
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

  it('Should login correctly and return a valid JSON Web Token', function () {
    return chai.request(app)
      .post('/auth/login')
      .send({
        username: testUser.username,
        password: testUser.password
      })
      .then(response => {
        expect(response).to.have.status(HTTP_STATUS_CODES.OK);
        expect(response).to.be.json;
        expect(response.body).to.be.a('object');
        expect(response.body).to.include.keys('jwtToken');

        const jwtPayload = jsonwebtoken.verify(response.body.jwtToken, JWT_SECRET, {
          algorithm: ['HS256']
        });
        expect(jwtPayload.user).to.be.a('object');
        expect(jwtPayload.user).to.deep.include({
          username: testUser.username,
          email: testUser.email,
          name: testUser.name
        });
      });
  });

  it('Should refresh the user JSON Web Token', function () {
    const firstJwtPayload = jsonwebtoken.verify(jwtToken, JWT_SECRET, {
      algorithm: ['HS256']
    });
    return chai.request(app)
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${jwtToken}`)
      .then(response => {
        expect(response).to.have.status(HTTP_STATUS_CODES.OK);
        expect(response).to.be.json;
        expect(response.body).to.be.a('object');
        expect(response.body).to.include.keys('jwtToken');

        const newJwtPayload = jsonwebtoken.verify(response.body.jwtToken, JWT_SECRET, {
          algorithm: ['HS256']
        });
        expect(newJwtPayload.user).to.be.a('object');
        expect(newJwtPayload.user).to.deep.include({
          username: testUser.username,
          email: testUser.email,
          name: testUser.name
        });

        expect(newJwtPayload.exp).to.be.at.least(firstJwtPayload.exp);
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