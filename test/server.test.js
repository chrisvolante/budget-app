// Imports dependencies.
const chai = require('chai');
const chaiHttp = require('chai-http');
const { HTTP_STATUS_CODES } = require('../app/config.js');
const { startServer, stopServer, app } = require('../app/server.js');

const expect = chai.expect; // So we can do "expect" instead of always typing "chai.expect"
chai.use(chaiHttp); // implements chai http plugin

describe('Integration tests for: /', function () {
  before(function () {
    return startServer(true);
  });
  after(function () {
    return stopServer();
  });

  it('Should return index.html', function () {
    chai.request(app)
      .get('/')
      .then(response => {
        expect(response).to.have.status(HTTP_STATUS_CODES.OK);
        expect(response).to.be.html;
        expect(response.text).to.have.string('<!DOCTYPE html>');
      });
  });
});