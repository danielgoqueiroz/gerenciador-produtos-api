const jwt = require("jsonwebtoken");

function login(id) {
  const token = jwt.sign({ id: id }, process.env.SECRET, {
    expiresIn: 300,
  });
  return token;
}

// Filtro de token
function verifyJWT(req, res, next) {
  let token = req.headers["authorization"];
  if (!token)
    return res.status(401).send({
      auth: false,
      message: "Token inválido.",
    });

  if (!token.includes("bearer ")) {
    res.status(403).send({
      auth: false,
      message: "Token inválido.",
    });
  }
  token = token.replace("bearer ", "");

  try {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err)
        return res.status(500).json({
          auth: false,
          message: "Failed to authenticate token.",
        });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.error("Erro: ", err);
  }
}

module.exports = {
  verifyJWT,
  login,
};
