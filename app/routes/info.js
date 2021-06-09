let express = require("express");
let router = express.Router();

router.get("/", function (req, res) {
  res.send("Servidor ON.");
});

module.exports = router;
