// const helper = require("../test.helper");
// const connect = require("../../app/db/dbConnect");
// const expect = require("chai").expect;
// const User = require("../../app/model/User");

// let client;

// before(async function () {
//   client = await connect();
// });
// after(async function () {
//   client.end();
// });

// describe("[ Banco de dados - User ] - Deve validar regras de persistência de usuários", async function () {
//   it.only("(store) Deve cadastrar usuário", async function () {
//     const newUser = new User("Usuário teste", "senha123456");
//     const userSaved = client.save(newUser);

//     expect(userSaved.id).to.be.true;
//     expect(tables.includes("CATEGORY")).to.be.true;
//     expect(tables.includes("PRODUCT")).to.be.true;

//     const response = await client.query("SELECT * FROM USER");

//     const result = await client.query(`SELECT table_name
//         FROM information_schema.tables
//         WHERE table_schema = 'public'
//         ORDER BY table_name;`);

//     expect(result.rows.length).to.be.equal(3);
//     const tables = result.rows.map((item) => {
//       return item.table_name;
//     });
//   });

//   it("(login) Login de usuário retornando um bearer token para utilizar nas chamadas abaixo", async function () {
//     const response = await client.query("SELECT * FROM USER");

//     const result = await client.query(`SELECT table_name
//         FROM information_schema.tables
//         WHERE table_schema = 'public'
//         ORDER BY table_name;`);

//     expect(result.rows.length).to.be.equal(3);
//     const tables = result.rows.map((item) => {
//       return item.table_name;
//     });
//     expect(tables.includes("USER")).to.be.true;
//     expect(tables.includes("CATEGORY")).to.be.true;
//     expect(tables.includes("PRODUCT")).to.be.true;
//   });
// });
