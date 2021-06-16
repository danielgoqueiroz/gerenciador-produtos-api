const express = require("express");
const router = express.Router();
const UserContoller = require("../controller/userController");
const userController = new UserContoller();
const jwt = require("../jwt/jwt");

// GET Users
router.get("/", function (req, res) {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para obter um usuário.'
  const id = req.query.id;
  const user = req.body;
  res.send("Usuário");
});

// POST User
router.post("/", async function (req, res) {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para obter um usuário.'
  const user = req.body;
  const userSaved = await userController.saveUser(user);
  res.status(201).send({ message: "Usuário criado" });
});

module.exports = router;
