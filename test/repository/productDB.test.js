const helper = require("../test.helper");
const ProductDB = require("../../app/db/productDB");
const CategoryDB = require("../../app/db/categoryDB");
const expect = require("chai").expect;
const Product = require("../../app/model/Product");
const Category = require("../../app/model/Category");

beforeEach(async function () {
  await helper.resetDb();
  await helper.createDB();
  this.productDB = new ProductDB();
  this.categoryDB = new CategoryDB();
});

describe("[ Banco de dados - Produto ] - Deve validar regras de persistência de produtos", async function () {
  it("(store) Deve cadastrar produto", async function () {
    const initialProducts = await this.productDB.getList(null, 0);

    const manufacturingDate = new Date(Date.parse("2020-01-01"));
    const expirationDate = new Date(Date.parse("2022-06-15"));

    const newProduct = new Product(
      1,
      "Celular",
      manufacturingDate.getTime(),
      false,
      expirationDate.getTime(),
      120.01
    );
    const ProductSaved = await this.productDB.save(newProduct);

    expect(ProductSaved).to.not.be.null;
    expect(ProductSaved.id).to.not.be.null;

    const afterSavedProducts = await this.productDB.getList(null, 0);

    expect(afterSavedProducts.length - 1).to.be.equal(initialProducts.length);
  });

  it("(update) Atualizar produto", async function () {
    const product = await this.productDB.getById(1);

    expect(product).to.not.be.null;
    expect(product.id).to.not.be.null;

    const productToUpdate = product;
    productToUpdate.name = "Tablet";

    await this.productDB.update(productToUpdate);
    const productUpdated = await this.productDB.getById(product.id);

    expect(productUpdated).to.be.not.null;
    expect(productUpdated.id).to.be.not.null;
    expect(productUpdated.id).to.be.equal(product.id);
    expect(productUpdated.id).to.be.equal(product.id);
    expect(productUpdated.name).to.be.equal("Tablet");
    expect(productUpdated.expirationDate).to.be.equal(product.expirationDate);
    expect(productUpdated.manufacturingDate).to.be.equal(
      product.manufacturingDate
    );
  });

  it("(delete) Remover produto", async function () {
    const initialProducts = await this.productDB.getList(null, 0);
    const deleted = await this.productDB.delete(initialProducts[0].id);
    expect(deleted).to.be.true;
    const afterDeleteProducts = await this.productDB.getList(null, 0);
    expect(afterDeleteProducts.length).to.be.equal(initialProducts.length - 1);
  });
  it("(show) Exibir produto", async function () {
    const productLoaded = await this.productDB.getById(1);

    expect(productLoaded).to.be.not.null;
    expect(productLoaded.id).to.be.not.null;
    expect(productLoaded.categoryId).to.be.not.null;
    expect(productLoaded.name).to.be.not.null;
    expect(productLoaded.manufacturingDate).to.be.not.null;
    expect(productLoaded.perishableProduct).to.be.not.null;
    expect(productLoaded.expirationDate).to.be.not.null;
    expect(productLoaded.price).to.be.not.null;
  });

  it("(index) Listar produtos", async function () {
    const products = await this.productDB.getList(null, 0);
    expect(products).to.be.an("array");
    expect(products.length > 1).to.be.true;
  });
  it("Filtrar por categorias", async function () {
    const products = await this.productDB.getList("Eletrônico", 0);
    expect(products).to.be.not.null;
    expect(products.length > 0).to.be.true;
  });
});

// Support
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
  return product;
}
