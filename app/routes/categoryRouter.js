let express = require("express");
let router = express.Router();
const jwt = require("../jwt/jwt");
const CategoryDB = require("../db/categoryDB");
const categoryDB = new CategoryDB();

// // UPDATE Category
router.put("/:id", jwt.verifyJWT, async function (req, res) {
  const id = req.params.id;
  const category = req.body;
  category.id = id;
  try {
    if (category) {
      const categorySaved = await categoryDB.update(category);
      res.status(202).send(categorySaved);
    } else {
      res.status(401).send({ message: "Category inválido" });
    }
  } catch (err) {
    res.status(500).send({ message: "Erro no serviço", error: err });
  }
});

// DELETE Categories
router.delete("/:id", jwt.verifyJWT, async function (req, res) {
  const id = req.params.id;
  if (id) {
    const category = await categoryDB.delete(id);
    if (category) {
      res.status(202).send(category);
    } else {
      res.status(403).send({ message: "Erro ao remover item." });
    }
  }
});

// POST categoria
router.post("/", jwt.verifyJWT, async function (req, res) {
  const category = req.body;
  const isDateInvalid =
    new Date(category.expiration_date).getTime() <
    new Date(category.manufacturing_date).getTime();

  if (isDateInvalid) {
    return res
      .status(403)
      .send({ message: "Data de fabricação maior que data de validade." });
  }
  try {
    if (category) {
      const categorySaved = await categoryDB.save(category);
      return res.status(201).send(categorySaved);
    } else {
      return res.status(401).send({ message: "Category inválido" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Erro no serviço", error: err });
  }
});

// GET Categorys
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
  const categories = await categoryDB.getList(
    filters,
    page !== undefined ? page : 0
  );
  res.status(200).send(categories);
});

// GET Categorys
router.get("/:id", jwt.verifyJWT, async function (req, res) {
  const id = req.params.id;
  if (id) {
    const category = await categoryDB.getById(id);
    res.status(200).send(category);
  }
});

module.exports = router;
