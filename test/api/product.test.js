const expect = require("chai").expect;
const server = require("../../app/server/server");
const User = require("../../app/model/User");
const axios = require("axios");

describe("Testes de produtos", async function () {
  it("// - (index) Não listar produtos sem autorização", async function () {

    const url = `http://${process.env.HOST}:${process.env.PORT}/product`;

    const responseGetProducts = await axios.get(url)
      .then((result) => {
        return result
      }).catch(response => {
        expect(response.response.status).to.be.equal(401);
        expect(response.response.data.message).to.be.equal("Token inválido.");
      });
  });

  it.only("// - (index) Listar produtos", async function () {
    const user = new User("Usuario Teste", "teste123");
    const urlLogin = `http://${process.env.HOST}:${process.env.PORT}/user/login`;


    const headers = await axios.post(urlLogin, user).then((result) => {
      const token = result.data.token
      const headers = {
        Authorization: token
      };
      return headers;
    }).catch(() => {});


    const url = `http://${process.env.HOST}:${process.env.PORT}/product`;

    const responseGetProducts = await axios( {method : 'get', url: url, headers:headers} );
      
    //   url, headers).then((result) => {
    //   expect(result.status).to.be.equal(200);
    //   expect(result.body).to.be.not.null;
    //   expect(result.data.token).to.be.not.null;
    //   expect(result.data.token).to.be.an("string");
    //   expect(result.data.token.includes("bearer ")).to.be.true;
    //   return returned;
    // });
    console.log(responseGetProducts)
  });
});




//   expect(responseGetProducts).be.an('array');
// });


// (show) Exibir produto
// - (store) Cadastrar produto
// - (update) Atualizar produto
// - (delete) Remover produto
//  Filtrar por categorias