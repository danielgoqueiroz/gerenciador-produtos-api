const server = require("../app/server/server");

const should = require("should");
const request = require("request");
const expect = require("chai").expect;

before(function (done) {
  server();
  done();
});

module.exports = {
  server,
  should,
  request,
  expect,
  before,
};
