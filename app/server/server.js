require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

//Rotas
app.use("/info", require("../routes/infoRouter"));
app.use("/product", require("../routes/productRouter"));
app.use("/user", require("../routes/userRouter"));

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

//Iniciado serviço
const server = function () {
  app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(
      `Iniciado servidor em: ${process.env.HOST}:${process.env.PORT}/`
    );
  });
};

module.exports = server;
