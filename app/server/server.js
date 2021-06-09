require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const app = express();

//Definição de rotas
let routerInfo = require("../routes/info");

//Rotas
app.use("/info", routerInfo);

//Iniciado serviço
const server = function () {
  app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(
      `Iniciado servidor em: ${process.env.HOST}:${process.env.PORT}/`
    );
  });
};

module.exports = server;
