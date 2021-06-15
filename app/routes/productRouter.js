let express = require("express");
let router = express.Router();

// Filtro de token
function verifyJWT(req, res, next) {
  const token = req.headers["token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "Token inválido." });

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

router.get("/", verifyJWT, function (req, res) {
  res.send("Produto(s)");
});

module.exports = router;
