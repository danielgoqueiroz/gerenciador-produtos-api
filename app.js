const app = require("./app/server/server");

require("dotenv").config();

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server ON." });
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
