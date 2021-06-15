const expect = require("chai").expect;
const server = require("../../app/server/server");
const User = require("../../app/model/User");
const axios = require("axios");

describe("Testes de produtos", async function (done) {
  it.only("// - (index) Listar produtos", async function (done) {
    const user = new User("Usuario Teste", "teste123");
    const urlLogin = `http://${process.env.HOST}:${process.env.PORT}/user/login`;

    const token = await axios
      .post(urlLogin, user)
      .then((result) => {
        return result.data.token;
      })
      .catch((err) => {});

    const url = `http://${process.env.HOST}:${process.env.PORT}/product`;

    const headers = {
      token: token,
    };
    const responseGetProducts = await axios.get(url, headers).then((result) => {
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.not.null;
      expect(result.data.token).to.be.not.null;
      expect(result.data.token).to.be.an("string");
      expect(result.data.token.includes("bearer ")).to.be.true;
      return result;
    });

    const products = await axios
      .post(url, headers)
      .then((response) => {
        return response;
      })
      .catch((err) => {});
  });
});

// (show) Exibir produto
// - (store) Cadastrar produto
// - (update) Atualizar produto
// - (delete) Remover produto
//   ■ Filtrar por categorias
