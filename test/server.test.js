const server = require("../app/server/server");
require("dotenv").config();

const should = require("should");
const request = require("request");
const expect = require("chai").expect;
const chai = require("chai");

describe("Teste de servidor", function () {
  before(function () {
    server();
  });

  it.only("Deve iniciar servidor.", function (done) {
    const url = { url: `http://${process.env.HOST}:${process.env.PORT}/info` };
    request.get(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal("Servidor ON.");
      done();
    });
  });
});
