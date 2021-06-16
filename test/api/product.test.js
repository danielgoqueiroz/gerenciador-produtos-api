const expect = require("chai").expect;
const server = require("../../app/server/server");
const User = require("../../app/model/User");
const Product = require("../../app/model/Product");
const axios = require("axios");
const ProductDB = require("../../app/db/productDB");

describe("Testes de produtos", async function () {
  it("(index) Não listar produtos sem autorização", async function () {
    const url = `http://${process.env.HOST}:${process.env.PORT}/product`;

    const responseGetProducts = await axios({ method: "get", url: url })
      .then((result) => {
        return result;
      })
      .catch((response) => {
        expect(response.response.status).to.be.equal(401);
        expect(response.response.data.message).to.be.equal("Token inválido.");
      });
  });

  it("(index) Listar produtos", async function () {
    const headers = await doLogin();

    const url = `http://${process.env.HOST}:${process.env.PORT}/product`;

    const responseGetProducts = await axios({
      method: "get",
      url: url,
      headers: headers,
    });
    const result = responseGetProducts.data;

    expect(responseGetProducts.status).to.be.equal(200);
    expect(result).to.be.not.null;
    expect(result).to.be.an("array");
    expect(result.length > 1).to.be.true;
  });
  it("(show) Exibir produto", async function () {
    const headers = await doLogin();

    const url = `http://${process.env.HOST}:${process.env.PORT}/product/1`;

    const responseGetProducts = await axios({
      method: "get",
      url: url,
      headers: headers,
    });
    const product = responseGetProducts.data;

    expect(responseGetProducts.status).to.be.equal(200);
    expect(product).to.be.not.null;
    const productObj = Object.assign(new Product(), product);
    expect(productObj).to.be.an("object");
  });

  it("(store) Cadastrar produto", async function () {
    const headers = await doLogin();

    const url = `http://${process.env.HOST}:${process.env.PORT}/product`;

    const product = new Product(
      1,
      "Ar condicionado",
      new Date(),
      false,
      new Date(),
      999.99
    );

    const response = await axios({
      method: "post",
      data: product,
      url: url,
      headers: headers,
    }).catch((err) => err);

    const productSaved = response.data;
    expect(response.status).to.be.equal(201);
    expect(productSaved).to.not.be.null;
  });

  it("(update) Atualizar produto", async function () {
    const headers = await doLogin();

    const url = `http://${process.env.HOST}:${process.env.PORT}/product/1`;

    const product = new Product(
      1,
      "Ar condicionado",
      new Date(),
      false,
      new Date(),
      999.99
    );

    const responseUpdate = await axios({
      method: "put",
      data: product,
      url: url,
      headers: headers,
    }).catch((err) => err);

    expect(responseUpdate.status).to.be.equal(202);

    const productUpdated = responseUpdate.data;

    expect(responseUpdate).to.be.not.null;
    expect(productUpdated.id).to.be.equal(1);
  });
  it("(delete) Remover produto", async function () {
    const headers = await doLogin();

    const url = `http://${process.env.HOST}:${process.env.PORT}/product/1`;
    const response = await axios({
      method: "delete",
      url: url,
      headers: headers,
    }).catch((err) => err);

    expect(response.status).to.be.equal(202);
  });

  it("Filtrar por categorias", async function () {
    const headers = await doLogin();

    const url = `http://${process.env.HOST}:${process.env.PORT}/product?category=Eletrônico`;
    const categories = await axios({
      method: "get",
      url: url,
      headers: headers,
    }).catch((err) => err);

    const productsCategory1 = categories.data.filter((item) => {
      return item.category_id == 1;
    });

    expect(productsCategory1.length).to.be.equal(categories.data.length);
    expect(categories.status).to.be.equal(200);
    expect(categories.data.length).to.be.equal(2);
  });

  it("Deve informar erro quando a data de fabricação (manufacturingDate) for maior que a data de validade (expirationDate)", async function () {
    const headers = await doLogin();

    const product = new Product(
      1,
      "Ar condicionado",
      new Date("2021-01-01"),
      false,
      new Date("2000-01-01"),
      999.99
    );

    const url = `http://${process.env.HOST}:${process.env.PORT}/product`;
    const productInvalid = await axios({
      method: "post",
      data: product,
      url: url,
      headers: headers,
    }).catch((err) => {
      expect(err.response.status).to.be.equal(403);
      expect(err.response.data.message).to.be.equal(
        "Data de fabricação maior que data de validade."
      );
      err;
    });
  });

  it("A listagem de produtos deve permitir ordenação por campos e com paginação contendo 10 produtos por página;", async function () {
    const headers = await doLogin();

    const productDB = new ProductDB();
    let count = 0;
    for (count = 0; count < 20; count++) {
      const saved = await this.productDB.save(
        new Product(
          1,
          `Ar condicionado ${count++}`,
          new Date("2021-01-01"),
          false,
          new Date("2022-01-01"),
          999.99
        )
      );
    }
    const url = `http://${process.env.HOST}:${process.env.PORT}/product?page=0`;

    const response = await axios({
      method: "get",
      url: url,
      headers: headers,
    }).catch((err) => {
      err;
    });
    const products = response.data;

    expect(products).to.be.not.null;
    expect(products.length).to.be.equal(10);
  });
});

async function doLogin() {
  const user = new User("Usuario Teste", "teste123");
  const urlLogin = `http://${process.env.HOST}:${process.env.PORT}/user/login`;

  const headers = await axios
    .post(urlLogin, user)
    .then((result) => {
      const token = result.data.token;
      const headers = {
        Authorization: token,
      };
      return headers;
    })
    .catch(() => {});
  return headers;
}
