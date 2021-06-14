const helper = require("../test.helper");
const ProductDB = require("../../app/db/productDB");
const CategoryDB = require("../../app/db/categoryDB");
const expect = require("chai").expect;
const Product = require("../../app/model/Product");
const Category = require("../../app/model/Category");

let productDB;
let categoryDB;

beforeEach(async function () {
  await helper.resetDb();
  await helper.createDB();
  this.productDB = new ProductDB();
  this.categoryDB = new CategoryDB();
});

describe("[ Banco de dados - Produto ] - Deve validar regras de persistência de produtos", async function () {
  it("(store) Deve cadastrar produto", async function () {
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

  it.only("(update) Atualizar produto", async function () {
    const product = await savedProduct(this.categoryDB, this.productDB);

    expect(product).to.not.be.null;
    expect(product.id).to.not.be.null;

    const productToUpdate = product
    productToUpdate.name = 'Tablet';

    await this.productDB.update(productToUpdate);
    const productUpdated = await this.productDB.getById(product.id);

    expect(productUpdated).to.be.not.null;
    expect(productUpdated.id).to.be.not.null;
    expect(productUpdated.id).to.be.equal(product.id);
    expect(productUpdated.id).to.be.equal(product.id);
    expect(productUpdated.name).to.be.equal("Tablet");
    expect(productUpdated.expirationDate).to.be.equal(product.expirationDate);
    expect(productUpdated.manufacturingDate).to.be.equal(product.manufacturingDate);

  });

  it("(delete) Remover produto", async function () {});
  it("(show) Exibir produto", async function () {
    const product  =  await savedProduct(this.categoryDB, this.productDB)
    const productLoaded = await this.productDB.getById(product.id);
    expect(productLoaded).to.be.not.null;
    expect(JSON.stringify(productLoaded), `\nE: ${JSON.stringify(product)} \nR: ${JSON.stringify(productLoaded)}`).to.be.equal(JSON.stringify(product));

  });
  it("(index) Listar produtos", async function () {});
  it("■ Filtrar por categorias", async function () {});
});


async function savedProduct(categoryDB, productDB) {
    const category = new Category("Eletrônico");
    const categorySaved = await categoryDB.save(category);
    expect(categorySaved).to.not.be.null;
    
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
    const product = await productDB.save(newProduct);
    return product
}