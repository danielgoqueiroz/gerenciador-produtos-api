// - A listagem de produtos deve permitir ordenação por campos e com paginação contendo 10 produtos por página;
// - O Preço do produto (price) deverá ser registrado com 2 casas decimais, Exemplo: 120.00

const getConnection = require("./dbConnect");

class ProductDB {
  constructor() {
    this.client;
  }

  async getById(id){
    try {
      new Number(id)
    } catch {
      throw new Error("O valor do id deve ser numérico.")
    }

    this.client = await getConnection();

    try {
      const products = await this.client.query(`SELECT * FROM \"PRODUCT\" WHERE id = ${id}`);
      return products.rows.length == 1 ? products.rows[0] : null;
    } catch (err) {
      throw new Error("Erro ao buscar produtos no banco de dados.", err);
    } finally {
      this.client.end();
    }
    
  }

  async save(product) {
    const productLoad = await this.getByName(product.name);
    if (productLoad) {
      throw new Error("produto já cadastrada");
    }

    this.client = await getConnection();

    try {
      const query = `INSERT INTO \"PRODUCT\" ( 
          name,
          manufacturingDate,
          perishableProduct,
          expirationDate,
          price
          ) VALUES (
              '${product.name}', 
              to_timestamp(${product.manufacturingDate}), 
              ${product.perishableProduct}, 
              to_timestamp(${product.expirationDate}), 
              ${product.price}
              ) RETURNING *;`;

      const response = await this.client.query(query);
      return response.rows[0];
    } catch (err) {
      throw new Error("Erro ao acessar db de produto.", err);
    } finally {
      this.client.end();
    }
  }

  async getOne(id) {
    const isValid = new Number(id);

    if (isValid === undefined) {
      throw new Error("Id precisa ser numérico");
    }
    this.client = await getConnection();
    try {
      const products = await this.client.query(
        `SELECT * FROM \"PRODUCT\" WHERE id = ${id}`
      );
      return products.rows.length == 1 ? products.rows[0] : Products.rows;
    } catch (err) {
      throw new Error("Erro ao buscar item do banco de dados");
    } finally {
      this.client.end();
    }
  }

  async getByName(name) {
    if (name === undefined || name.length < 3) {
      throw new Error("Nome inválido");
    }

    this.client = await getConnection();
    try {
      const products = await this.client.query(
        `SELECT * FROM \"PRODUCT\" WHERE name = '${name}'`
      );
      return products.rows.length == 1 ? products.rows[0] : null;
    } catch (err) {
      throw new Error("Erro ao buscar item do banco de dados");
    } finally {
      this.client.end();
    }
  }

  async getList() {
    this.client = await getConnection();
    try {
      const products = await this.client.query(`SELECT * FROM \"PRODUCT\"`);
      return products.rows;
    } catch (err) {
      throw new Error("Erro ao buscar produtos no banco de dados.", err);
    } finally {
      this.client.end();
    }
  }

  async delete(id) {
    const isValid = new Number(id);
    if (isValid === undefined) {
      throw new Error("Id precisa ser numérico");
    }
    this.client = await getConnection();
    try {
      const products = await this.client.query(
        `DELETE FROM \"PRODUCT\" WHERE id = ${id} RETURNING *`
      );
      return products.rows.length == 1;
    } catch (err) {
      throw new Error("Erro ao buscar produtos no banco de dados.", err);
    } finally {
      this.client.end();
    }
  }

  async update(product) {
    if (!product.id) {
      throw new Error("O id é obrigatório para realização do update");
    }
    this.client = await getConnection();
    try {
      const sql = `UPDATE \"PRODUCT\" SET 
      name = '${product.name}',
      manufacturingDate = ${product.manufacturingdate.getTime()},
      perishableProduct = ${product.perishableproduct},
      expirationDate =  ${product.expirationdate.getTime()},
      price = ${product.price}
  where id = ${product.id}`
      const response = await this.client.query(sql);

      return response.rows[0];
    } catch (err) {
      throw new Error("Erro ao acessar db de produto.", err);
    } finally {
      this.client.end();
    }
  }
}

module.exports = ProductDB;
