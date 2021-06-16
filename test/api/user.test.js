const request = require("request");
const expect = require("chai").expect;
const server = require("../../app/server/server");
const User = require("../../app/model/User");
const axios = require("axios");

describe("Testes de usuário", function (done) {
  it("Cadastrar usuário: Dado dados válidos de usuário, deve salvar novo usuário.", function () {
    const user = new User("Teste", "senha123");
    const url = `http://${process.env.HOST}:${process.env.PORT}/user`;

    request.post(url, { json: user }, (error, res, body) => {
      expect(res.statusCode).to.be.equal(201);
      expect(res.body).to.be.not.null;
      expect(res.body.message).to.be.equal("Usuário criado");
    });
  });
});

describe("Testes de login", async function () {
  it("Login: Dado um usuário válido, deve gerar token do tipo bearer.", async function () {
    this.timeout(10000);
    const user = new User("Usuario Teste", "teste123");
    const url = `http://${process.env.HOST}:${process.env.PORT}/login`;

    const result = await axios
      .post(url, user)
      .then((result) => {
        return result;
      })
      .catch((err) => {});
    expect(result.status).to.be.equal(200);
    expect(result.data.token).to.be.not.null;
    expect(result.data.token).to.be.an("string");
    expect(result.data.token.includes("bearer ")).to.be.true;
  });
});
