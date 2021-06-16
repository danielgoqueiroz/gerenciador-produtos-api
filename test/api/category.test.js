const expect = require("chai").expect;
const server = require("../../app/server/server");
const User = require("../../app/model/User");
const Category = require("../../app/model/Category");
const axios = require("axios");

describe("Testes de categoria", async function () {
  it("(index) Não listar categorias sem autorização", async function () {
    const url = `http://${process.env.HOST}:${process.env.PORT}/category`;

    const response = await axios({ method: "get", url: url })
      .then((result) => {
        return result;
      })
      .catch((response) => {
        expect(response.response.status).to.be.equal(401);
        expect(response.response.data.message).to.be.equal("Token inválido.");
      });
  });
  it("(index) Listar categorias", async function () {
    const headers = await doLogin();

    const url = `http://${process.env.HOST}:${process.env.PORT}/category`;

    const responseGetCategories = await axios({
      method: "get",
      url: url,
      headers: headers,
    });
    const result = responseGetCategories.data;

    expect(responseGetCategories.status).to.be.equal(200);
    expect(result).to.be.not.null;
    expect(result).to.be.an("array");
    expect(result.length > 1).to.be.true;
  });
  it("(show) Exibir categoria", async function () {
    const headers = await doLogin();

    const url = `http://${process.env.HOST}:${process.env.PORT}/category/1`;

    const responseGetCategories = await axios({
      method: "get",
      url: url,
      headers: headers,
    });
    const category = responseGetCategories.data;

    expect(responseGetCategories.status).to.be.equal(200);
    expect(category).to.be.not.null;
    const categoryObj = Object.assign(new Category(), category);
    expect(categoryObj).to.be.an("object");
  });
  it("(store) Cadastrar categoria", async function () {
    const headers = await doLogin();

    const url = `http://${process.env.HOST}:${process.env.PORT}/category`;

    const category = new Category("Nova categoria");

    const response = await axios({
      method: "post",
      data: category,
      url: url,
      headers: headers,
    }).catch((err) => err);

    const categorySaved = response.data;
    expect(response.status).to.be.equal(201);
    expect(categorySaved).to.not.be.null;
    expect(categorySaved.id).to.not.be.null;
    expect(categorySaved.description).to.be.equal(category.description);
  });
  it("(update) Atualizar categoria", async function () {
    const headers = await doLogin();

    const url = `http://${process.env.HOST}:${process.env.PORT}/category/1`;

    const category = new Category("Nova categoria");

    const responseUpdate = await axios({
      method: "put",
      data: category,
      url: url,
      headers: headers,
    }).catch((err) => err);

    expect(responseUpdate.status).to.be.equal(202);

    const categoryUpdated = responseUpdate.data;

    expect(responseUpdate).to.be.not.null;
    expect(categoryUpdated.id).to.be.equal(1);
    expect(categoryUpdated.description).to.be.equal(category.description);
  });
});

async function doLogin() {
  const user = new User("Usuario Teste", "teste123");
  const urlLogin = `http://${process.env.HOST}:${process.env.PORT}/login`;

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
