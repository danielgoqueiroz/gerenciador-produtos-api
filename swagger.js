const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app/server/server.js"];

swaggerAutogen(outputFile, endpointsFiles);

const doc = {
  info: {
    version: "1.0.0",
    title: "Gerenciado de produtos API",
    description: "Documnetação gerada automaticamente por <b>swagger</b>.",
  },
  host: "localhost:3000",
  basePath: "/",
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Login",
      description: "Endpoints",
    },
    {
      name: "User",
      description: "Endpoints",
    },
    {
      name: "Product",
      description: "Endpoints",
    },
    {
      name: "Category",
      description: "Endpoints",
    },
  ],
  definitions: {
    User: {
      id: 1,
      name: "Jhon Doe",
      password: "senha123",
    },
    Product: {
      id: 1,
      categoryId: "1",
      name: "Celular",
      manufacturingDate: "2020-01-01",
      perishableProduct: false,
      expirationDate: "2020-01-01",
      price: 120.0,
    },
    Category: {
      id: 1,
      description: "Eletrônico",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app");
});
