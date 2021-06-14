let express = require("express");
let router = express.Router();

router.get("/", function (req, res) {
  const id = req.query.id;
  const user = req.body;
  res.send("Usuário");
});

router.post("/", function (req, res) {
  const user = req.body;
  res.send("Usuário");
});

module.exports = router;
