require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');


const app = express();

app.use(bodyParser.json());


//Rotas
app.use("/info", require("../routes/infoRouter"));
app.use("/product", require("../routes/productRouter"));
app.use("/user", require("../routes/userRouter"));

//Iniciado serviço
const server = function () {
  app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(
      `Iniciado servidor em: ${process.env.HOST}:${process.env.PORT}/`
    );
  });
};

module.exports = server;
