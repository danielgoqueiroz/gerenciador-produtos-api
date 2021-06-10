const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "ger_prod",
  password: "",
  port: 5432,
});

client.connect();
