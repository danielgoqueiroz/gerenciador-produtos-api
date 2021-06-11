const helper = require("../test.helper");
const ProductDB = require("../../app/db/productDB");
const CategoryDB = require("../../app/db/categoryDB");
const expect = require("chai").expect;
const Product = require("../../app/model/Product");
const Category = require("../../app/model/Category");

let productDB;

beforeEach(async function () {
  await helper.resetDb();
  await helper.createDB();
  this.productDB = new ProductDB();
  this.categoryDB = new CategoryDB();
});

describe("[ Banco de dados - Produto ] - Deve validar regras de persistência de produtos", async function () {
  it.only("(store) Deve cadastrar produto", async function () {
    const category = new Category("Eletrônico");
    const categorySaved = await this.categoryDB.save(category);
    expect(categorySaved).to.not.be.null;

    const initialProducts = await this.productDB.getList();

    const manufacturingDate = new Date(Date.parse("2020-01-01"));
    const expirationDate = new Date(Date.parse("2022-06-15"));

    const newProduct = new Product(
      categorySaved.id,
      "Celular",
      manufacturingDate.getTime(),
      false,
      expirationDate.getTime(),
      120.01
    );
    const ProductSaved = await this.productDB.save(newProduct);

    expect(ProductSaved).to.not.be.null;
    expect(ProductSaved.id).to.not.be.null;

    const afterSavedProducts = await this.productDB.getList();

    expect(afterSavedProducts.length - 1).to.be.equal(initialProducts.length);
  });

  it("- (store) Cadastrar produto", async function () {});
  it("(update) Atualizar produto", async function () {});
  it("(delete) Remover produto", async function () {});
  it("(show) Exibir produto", async function () {});
  it("(index) Listar produtos", async function () {});
  it("■ Filtrar por categorias", async function () {});
});
