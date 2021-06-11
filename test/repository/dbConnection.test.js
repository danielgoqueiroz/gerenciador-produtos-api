const helper = require("../test.helper");
const getConnection = require("../../app/db/dbConnect");
const expect = require("chai").expect;

let client;

before(async function () {
  this.client = await getConnection();
});

it("[ Banco de dados ] - Deve validar conexão com banco de dados", async function () {
  const response = await this.client.query("SELECT * FROM USER");

  const result = await this.client.query(`SELECT table_name 
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_name;`);

  expect(result.rows.length).to.be.equal(3);
  const tables = result.rows.map((item) => {
    return item.table_name;
  });
  expect(tables.includes("USER")).to.be.true;
  expect(tables.includes("CATEGORY")).to.be.true;
  expect(tables.includes("PRODUCT")).to.be.true;
});
