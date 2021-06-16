require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

//Documentação
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../../swagger_output.json");

const app = express();

app.use(bodyParser.json());

//Rotas
app.use("/info", require("../routes/infoRouter"));
app.use("/product", require("../routes/productRouter"));
app.use("/user", require("../routes/userRouter"));
app.use("/login", require("../routes/loginRoutes"));
app.use("/category", require("../routes/categoryRouter"));
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//Iniciado serviço
const server = function () {
  app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(
      `Iniciado servidor em: ${process.env.HOST}:${process.env.PORT}/`
    );
  });
};

module.exports = server;
