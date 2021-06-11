const { Client } = require("pg");

const getConnection = async function () {
  const client = await new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "senha123",
    port: 5432,
  });

  client.connect();
  return client;
};

/**
 * Retora cliente de conexão com banco de dados
 */
module.exports = getConnection;
