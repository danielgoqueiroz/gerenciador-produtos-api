// - A listagem de produtos deve permitir ordenação por campos e com paginação contendo 10 produtos por página;
// - O Preço do produto (price) deverá ser registrado com 2 casas decimais, Exemplo: 120.00

const Product = require("../model/Product");
const getConnection = require("./dbConnect");

class ProductDB {
  constructor() {
    this.client;
  }

  async getById(id) {
    try {
      new Number(id);
    } catch {
      throw new Error("O valor do id deve ser numérico.");
    }

    this.client = await getConnection();

    try {
      const products = await this.client.query(
        `SELECT * FROM \"PRODUCT\" WHERE id = ${id}`
      );
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
          category_id, 
          name,
          manufacturing_date,
          perishable_product,
          expiration_date,
          price
          ) VALUES (
              ${product.category_id},
              '${product.name}', 
              to_timestamp(${
                new Date(product.manufacturing_date).getTime() / 1000
              }), 
              ${product.perishable_product}, 
              to_timestamp(${
                new Date(product.expiration_date).getTime() / 1000
              }), 
              ${product.price}
              ) RETURNING *;`;

      const saved = await this.client.query(query);
      return saved.rows[0];
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

  formatOrdering(text) {
    if (text === undefined || text === null) {
      return "asc";
    }
    if (text.toLowerCase() == "asc" || text.toLowerCase() == "desc") {
      return text;
    }
    throw new Error(`Parâmetro de ordenação ${text} inválido`);
  }

  async getList(filters, pagination) {
    this.client = await getConnection();

    if (filters === null) {
      filters = {};
      filters.category = "";
    }
    const formatedFilters = {
      category:
        filters.category !== undefined && filters.category !== null
          ? filters.category
          : "",
      name: this.formatOrdering(filters.name),
      manufacturing_date: this.formatOrdering(filters.manufacturing_date),
      expiration_date: this.formatOrdering(filters.expiration_date),
      price: this.formatOrdering(filters.price),
    };

    try {
      const page = pagination == 0 ? 0 : pagination * 10;
      const sql = `SELECT p.id, p.category_id, p."name" , p.manufacturing_date, p.perishable_product , p.expiration_date, p.price 
        FROM "PRODUCT" p inner join "CATEGORY" c on p.category_id = c.id
        where c.description like '%${formatedFilters.category}%' 
        order by
        p."name" ${formatedFilters.name},
        p.manufacturing_date ${formatedFilters.manufacturing_date},
        p.expiration_date ${formatedFilters.expiration_date},
        p.price ${formatedFilters.price}
         OFFSET ${page}   LIMIT 10 `;
      const products = await this.client.query(sql);
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
      manufacturing_date = to_timestamp(${
        new Date(product.manufacturing_date).getTime() / 1000
      }),
      perishable_product = ${product.perishable_product},
      expiration_date =  to_timestamp(${
        new Date(product.expiration_date).getTime() / 1000
      }),
      price = ${product.price}
  where id = ${product.id} RETURNING *;`;
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
