let express = require("express");
let router = express.Router();

// Filtro de token
function verifyJWT(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).send({
      auth: false,
      message: "Token inválido."
    });

  if (!token.includes('bearer ')) {
    res.status(403).send(({
      auth: false,
      message: "Token inválido."
    }));
  }

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({
          auth: false,
          message: "Failed to authenticate token."
        });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

router.get("/", verifyJWT, function (req, res) {
  const headers = req.headers
  console.log(headers);
  res.send("Produto(s)");
});

module.exports = router;