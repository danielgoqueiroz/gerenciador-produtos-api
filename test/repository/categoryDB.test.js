const helper = require("../test.helper");
const CategoryDB = require("../../app/db/categoryDB");
const expect = require("chai").expect;
const Category = require("../../app/model/Category");
const { assert } = require("chai");

let categoryDao;

beforeEach(async function () {
  await helper.resetDb();
  await helper.createDB();
  this.categoryDao = new CategoryDB();
});

describe("Teste de BD [ Categoria ] - Deve validar regras de persistência de categoria", async function (done) {
  it("(store) Cadastrar categoria", async function () {
    const newCategory = new Category("Eletrodoméstico");
    const categorySaved = Object.assign(
      Category,
      await this.categoryDao.save(newCategory)
    );
    expect(categorySaved).to.be.not.null;
    expect(categorySaved.categoryid).to.be.not.null;
    expect(categorySaved.description).to.be.equal(newCategory.description);
  });

  it("(store) Não deve cadastrar duas categorias com mesmo nome", async function () {
    const category = new Category("Eletrônico");
    let expectedCategories = await this.categoryDao.getList();

    try {
      await this.categoryDao.save(category);
    } catch (err) {
      expect(err).to.be.not.null;
      expect(err.message).to.be.equal("Categoria já cadastrada");
    }
  });

  it("(update) Atualizar categoria", async function () {
    const initialCategory = new Category("Eletrodoméstico");
    let categorySaved = await this.categoryDao.save(initialCategory);
    categorySaved = Object.assign(Category, categorySaved);
    expect(categorySaved.description).to.be.equal(initialCategory.description);

    categorySaved.description = "Eletrônico";

    const updatedCategory = await this.categoryDao.update(categorySaved);

    expect(updatedCategory).to.be.not.null;
    expect(updatedCategory.categoryid).to.be.not.null;
    expect(updatedCategory.description).to.be.equal(categorySaved.description);
  });
  it("(index) Listar categorias", async function () {
    const categories = await this.categoryDao.getList();

    expect(categories).to.be.an("array");
    expect(categories.length > 1).to.be.true;
  });

  it("(delete) Remover categoria", async function () {
    const categoryToDelete = await this.categoryDao.save(
      new Category("Eletrodoméstico")
    );

    await this.categoryDao.save(new Category("Jogos"));
    await this.categoryDao.save(new Category("Lazer"));

    const initialCategories = await this.categoryDao.getList();

    let deleted = await this.categoryDao.delete(categoryToDelete.id);
    expect(deleted).to.be.true;

    const afterDeletionCategory = await this.categoryDao.getList();
    expect(afterDeletionCategory.length).to.be.equal(
      initialCategories.length - 1
    );
  });

  it("(show) Exibir categoria", async function () {
    const category = await this.categoryDao.getOne(1);

    expect(category).not.to.be.null;

    const categoryValited = Object.assign(Category, category);
    expect(categoryValited).not.to.be.null;
    expect(categoryValited.description).to.be.equal("Eletrônico");
  });

  it("(show) Exibir categoria por nome", async function () {
    const category = await this.categoryDao.getByDescription("Eletrônico");

    expect(category).not.to.be.null;

    const categoryValited = Object.assign(Category, category);
    expect(categoryValited).not.to.be.null;
    expect(categoryValited.description).to.be.equal("Eletrônico");
  });
});
