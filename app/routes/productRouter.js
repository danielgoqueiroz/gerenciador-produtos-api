let express = require("express");
let router = express.Router();
const jwt = require('../jwt/jwt');
const ProductDB  = require('../db/productDB');
const productDB = new ProductDB();

// UPDATE Product
router.put("/:id", jwt.verifyJWT, async  function (req, res) {
  const id = req.params.id
  const product = req.body;
  product.id = id;
  try {

    if (product) {
      const productSaved = await productDB.update(product);
      res.status(202).send(productSaved);
    } else {
      res.status(401).send({message: "Produto inválido"});
    }
  } catch (err) {
    res.status(500).send({message: "Erro no serviço", error: err});
  }
});


// POST produto 
router.post("/", jwt.verifyJWT, async  function (req, res) {
  const product = req.body;
  try {

    if (product) {
      const productSaved = await productDB.save(product);
      res.status(201).send(productSaved);
    } else {
      res.status(401).send({message: "Produto inválido"});
    }
  } catch (err) {
    res.status(500).send({message: "Erro no serviço", error: err});
  }
});

// GET Products
router.get("/:id", jwt.verifyJWT, async  function (req, res) {
  const id = req.params.id;
  if (id) {
    const product = await productDB.getById(id);
    res.status(200).send(product);
  }


  const products = await productDB.getList();
  res.status(200).send(products);
});

module.exports = router;