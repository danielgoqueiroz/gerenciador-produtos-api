const express = require("express");
const router = express.Router();
const UserContoller = require("../controller/userController");
const userController = new UserContoller();
const jwt = require("../jwt/jwt");

// POST Login
router.post("/", async function (req, res) {
  // #swagger.tags = ['Login']
  // #swagger.description = 'Endpoint para realizar login.'
  try {
    const user = req.body;
    const userLoged = await userController.login(user);
    if (userLoged) {
      const token = jwt.login(userLoged.id);
      res.status(200).send({ token: `bearer ${token}` });
    }
  } catch (err) {
    res.status(403).send({ message: "Erro", error: err });
  }
});

module.exports = router;
