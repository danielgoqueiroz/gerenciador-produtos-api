let express = require("express");
let router = express.Router();
const jwt = require("../jwt/jwt");
const CategoryDB = require("../db/categoryDB");
const categoryDB = new CategoryDB();

// // UPDATE Category
router.put("/:id", jwt.verifyJWT, async function (req, res) {
  // #swagger.tags = ['Category']
  // #swagger.description = 'Endpoint para atualizar um categoria.'
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
  // #swagger.tags = ['Category']
  // #swagger.description = 'Endpoint para deletar um categoria.'
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
  // #swagger.tags = ['Category']
  // #swagger.description = 'Endpoint para adicionar um categoria.'
  const category = req.body;

  try {
    if (category) {
      const categorySaved = await categoryDB.save(category);
      return res.status(201).send(categorySaved);
    } else {
      return res.status(401).send({ message: "Categoria inválida" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Erro no serviço", error: err });
  }
});

// GET Categorias
router.get("/", jwt.verifyJWT, async function (req, res) {
  // #swagger.tags = ['Category']
  // #swagger.description = 'Endpoint para buscar um categorias.'
  const page = req.query.page;
  const categories = await categoryDB.getList();
  res.status(200).send(categories);
});

// GET Categorias
router.get("/:id", jwt.verifyJWT, async function (req, res) {
  // #swagger.tags = ['Category']
  // #swagger.description = 'Endpoint para buscar um categoria.'
  const id = req.params.id;
  if (id) {
    const category = await categoryDB.getById(id);
    res.status(200).send(category);
  }
});

module.exports = router;
