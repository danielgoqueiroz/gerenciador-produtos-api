const helper = require("../test.helper");
const UserDB = require("../../app/db/userDB");
const expect = require("chai").expect;
const User = require("../../app/model/User");

let userDB;

beforeEach(async function () {
  await helper.resetDb();
  await helper.createDB();
  this.userDB = new UserDB();
});

describe("[ Banco de dados - User ] - Deve validar regras de persistência de usuários", async function () {
  it("(store) Deve cadastrar usuário", async function () {
    const initialUsers = await this.userDB.getList();

    const newUser = new User("Usuário teste", "senha123456");
    const userSaved = await this.userDB.save(newUser);

    expect(userSaved).to.not.be.null;
    expect(userSaved.id).to.not.be.null;

    const afterSavedUsers = await this.userDB.getList();

    expect(afterSavedUsers.length - 1).to.be.equal(initialUsers.length);
  });

  it("(login) Deve buscar usuário por nome e password", async function () {
    const newUser = new User("Usuário teste", "senha123456");
    const userSaved = await this.userDB.save(newUser);

    expect(userSaved).to.not.be.null;
    expect(userSaved.id).to.not.be.null;

    const isCredentialValid = await this.userDB.isCredentialValid(
      newUser.name,
      newUser.password
    );

    expect(isCredentialValid).to.not.be.null;
    expect(isCredentialValid).to.be.true;
  });
});
