const express = require("express");
const app = express();
require("dotenv").config();

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
