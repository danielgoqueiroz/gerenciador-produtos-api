let express = require("express");
let router = express.Router();
const jwt = require("../jwt/jwt");
const ProductDB = require("../db/productDB");
const { text } = require("express");
const productDB = new ProductDB();

// // UPDATE Product
router.put("/:id", jwt.verifyJWT, async function (req, res) {
  const id = req.params.id;
  const product = req.body;
  product.id = id;
  try {
    if (product) {
      const productSaved = await productDB.update(product);
      res.status(202).send(productSaved);
    } else {
      res.status(401).send({ message: "Produto inválido" });
    }
  } catch (err) {
    res.status(500).send({ message: "Erro no serviço", error: err });
  }
});

// DELETE Products
router.delete("/:id", jwt.verifyJWT, async function (req, res) {
  const id = req.params.id;
  if (id) {
    const product = await productDB.delete(id);
    if (product) {
      res.status(202).send(product);
    } else {
      res.status(403).send({ message: "Erro ao remover item." });
    }
  }
});

// POST produto
router.post("/", jwt.verifyJWT, async function (req, res) {
  const product = req.body;
  const isDateInvalid =
    new Date(product.expiration_date).getTime() <
    new Date(product.manufacturing_date).getTime();

  if (isDateInvalid) {
    return res
      .status(403)
      .send({ message: "Data de fabricação maior que data de validade." });
  }
  try {
    if (product) {
      const productSaved = await productDB.save(product);
      return res.status(201).send(productSaved);
    } else {
      return res.status(401).send({ message: "Produto inválido" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Erro no serviço", error: err });
  }
});

// GET Products
router.get("/", jwt.verifyJWT, async function (req, res) {
  const page = req.query.page;
  const category =
    req.query.category !== undefined && req.query.category != null
      ? req.query.category
      : "";

  const filters = {
    category: category,
    manufacturing_date: req.query.manufacturing_date,
    expiration_date: req.query.expiration_date,
    price: req.query.price,
  };
  const products = await productDB.getList(
    filters,
    page !== undefined ? page : 0
  );
  res.status(200).send(products);
});

// GET Products
router.get("/:id", jwt.verifyJWT, async function (req, res) {
  const id = req.params.id;
  if (id) {
    const product = await productDB.getById(id);
    res.status(200).send(product);
  }
});

module.exports = router;
