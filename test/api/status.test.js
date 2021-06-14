const request = require("request");
const expect = require("chai").expect;
const server = require("../../app/server/server");

describe("Testes de info", function () {
  it("Deve realizar requisição de teste.", function (done) {
    const url = { url: `http://${process.env.HOST}:${process.env.PORT}/info` };
    request.get(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal("Servidor OK");
      done();
    });
  });
});
