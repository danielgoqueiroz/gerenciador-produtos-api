const express = require("express");
const router = express.Router();
const UserContoller = require("../controller/userController");
const userController = new UserContoller();
const jwt = require("jsonwebtoken");

router.get("/", function (req, res) {
  const id = req.query.id;
  const user = req.body;
  res.send("Usuário");
});

router.post("/", async function (req, res) {
  const user = req.body;
  const userSaved = await userController.saveUser(user);
  res.status(201).send({ message: "Usuário criado" });
});

router.post("/login", async function (req, res) {
  try {
    const user = req.body;
    const userLoged = await userController.login(user);
    if (userLoged) {
      const token = jwt.sign({ id: userLoged.id }, process.env.SECRET, {
        expiresIn: 300,
      });
      res.status(200).send({ token: `bearer ${token}` });
    }
  } catch (err) {
    res.status(403).send({ message: "Erro", error: err });
  }
});

module.exports = router;
