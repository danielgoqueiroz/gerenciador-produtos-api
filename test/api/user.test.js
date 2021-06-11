// const should = require("should");
// const request = require("request");
// const expect = require("chai").expect;

// describe("Testes de usuário", function () {
//   it("Cadastrar usuário: Dado dados válidos de usuário, deve salvar novo usuário.", function (done) {
//     const url = { url: `http://${process.env.HOST}:${process.env.PORT}/user` };

//     request.post(url, function (error, response, body) {
//       expect(response.statusCode).to.equal(200);
//       expect(response.body).to.equal("Servidor ON.");
//       done();
//     });
//   });
// });

// describe("Testes de login", function () {
//   it("Login: Dado um usuário válido, deve gerar token do tipo bearer.", function (done) {
//     const url = { url: `http://${process.env.HOST}:${process.env.PORT}/login` };

//     request.post(url, function (error, response, body) {
//       expect(response.statusCode).to.equal(200);
//       expect(response.body).to.equal("Servidor ON.");
//       done();
//     });
//   });
// });

// Login de usuário retornando um bearer token para utilizar nas chamadas abaixo
