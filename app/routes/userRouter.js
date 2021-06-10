let express = require("express");
let router = express.Router();

router.get("/", function (req, res) {
  res.send("Usuário");
});

module.exports = router;
