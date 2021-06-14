const request = require("request");
const expect = require("chai").expect;
const server = require("../../app/server/server");
const User = require("../../app/model/User");

describe("Testes de usuário", function (done) {
  it.only("Cadastrar usuário: Dado dados válidos de usuário, deve salvar novo usuário.", function (done) {
    const user = new User("Teste", "senha123");
    const url = `http://${process.env.HOST}:${process.env.PORT}/user`;

    request.post(url, { json: user }, (error, res, body) => {
      console.log(res);
    });

    // axios
    //   .post(url, user)
    //   .then(function (res) {
    //     expect(res.statusCode).to.equal(201);
    //     const userSaved = response.body;
    //     expect(userSaved.id).to.not.be.null;
    //     expect(userSaved.name).to.not.be.null;
    //     expect(userSaved.password).to.not.be.null;
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
    done();
  });
});

describe("Testes de login", function () {
  it("Login: Dado um usuário válido, deve gerar token do tipo bearer.", function () {
    const url = { url: `http://${process.env.HOST}:${process.env.PORT}/login` };

    request.post(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal("Servidor ON.");
    });
  });
});

// Login de usuário retornando um bearer token para utilizar nas chamadas abaixo
