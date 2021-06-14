const server = require("../app/server/server");
const getConnection = require("../app/db/dbConnect");
const should = require("should");
const request = require("request");
const expect = require("chai").expect;
const fs = require("fs");
const { throws } = require("should");
const path = require("path");

const eraserDB = async function () {
  let client;
  try {
    client = await getConnection();
    const result = await client.query(`
    drop table IF EXISTS public."USER";
    drop table IF EXISTS public."PRODUCT";
    drop table IF EXISTS public."CATEGORY";
  `);
  } catch (err) {
    console.error("Erro ao apagar dados do DB", err);
  } finally {
    client.end();
  }
};

const createDB = async function () {
  let client;
  try {
    const pathFile = path.resolve("resources/db/001_create_tables.sql");
    if (!fs.existsSync(pathFile)) {
      throw new Error("Arquivo de banco de dados de teste não encontrado.");
    }
    const sql = fs.readFileSync(pathFile, "utf8");
    client = await getConnection();
    const result = await client.query(sql);
  } catch (err) {
    console.error("Erro ao criar BD", err);
  } finally {
    client.end();
  }
};

before(function () {
  server();
});

module.exports = {
  server,
  should,
  request,
  expect,
  before,
  resetDb: eraserDB,
  createDB,
};
