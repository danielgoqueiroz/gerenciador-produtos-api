const expect = require("chai").expect;
const server = require("../../app/server/server");
const User = require("../../app/model/User");
const Product = require('../../app/model/Product')
const axios = require("axios");

describe("Testes de produtos", async function () {
  it("(index) Não listar produtos sem autorização", async function () {

    const url = `http://${process.env.HOST}:${process.env.PORT}/product`;

    const responseGetProducts = await axios.get(url)
      .then((result) => {
        return result
      }).catch(response => {
        expect(response.response.status).to.be.equal(401);
        expect(response.response.data.message).to.be.equal("Token inválido.");
      });
  });

  it("(index) Listar produtos com autorização", async function () {
    const headers = await doLogin()

    const url = `http://${process.env.HOST}:${process.env.PORT}/product`;

    const responseGetProducts = await axios({
      method: 'get',
      url: url,
      headers: headers
    });
    const result = responseGetProducts.data

    expect(responseGetProducts.status).to.be.equal(200);
    expect(result).to.be.not.null;
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(2);

    console.log(responseGetProducts)
  });
  it("(show) Exibir produto", async function () {
    const headers = await doLogin()

    const url = `http://${process.env.HOST}:${process.env.PORT}/product/1`;

    const responseGetProducts = await axios({
      method: 'get',
      url: url,
      headers: headers
    });
    const product = responseGetProducts.data

    expect(responseGetProducts.status).to.be.equal(200);
    expect(product).to.be.not.null;
    const productObj = Object.assign(new Product(), product);
    expect(productObj).to.be.an('object');

    console.log(responseGetProducts)
  });

  it("(store) Cadastrar produto", async function () {
    const headers = await doLogin()

    const url = `http://${process.env.HOST}:${process.env.PORT}/product`;

    const product = new Product(1, "Ar condicionado", new Date(), false, new Date(), 999.99);

    const response = await axios({
      method: 'post',
      data: product,
      url: url,
      headers: headers
    }).catch(err => err);

    const productSaved = response.data
    expect(response.status).to.be.equal(201);
    expect(productSaved).to.not.be.null;
  });

  it.only("(update) Atualizar produto", async function () {
    const headers = await doLogin()

    const url = `http://${process.env.HOST}:${process.env.PORT}/product/1`;

    const product = new Product(1, "Ar condicionado", new Date(), false, new Date(), 999.99);

    const responseUpdate = await axios({
      method: 'put',
      data: product,
      url: url,
      headers: headers
    }).catch(err => err);

    expect(responseUpdate.status).to.be.equal(202);
    
    const productUpdated = responseUpdate.data
    
    expect(responseUpdate).to.be.not.null
    expect(productUpdated.id).to.be.equal(1)
  });
  it("(delete) Remover produto", async function () {});
  it("Filtrar por categorias", async function () {});

});

async function doLogin() {
  const user = new User("Usuario Teste", "teste123");
  const urlLogin = `http://${process.env.HOST}:${process.env.PORT}/user/login`;

  const headers = await axios.post(urlLogin, user).then((result) => {
    const token = result.data.token
    const headers = {
      Authorization: token
    };
    return headers;
  }).catch(() => {});
  return headers;
}