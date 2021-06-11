const getConnection = require("./dbConnect");

class CategoryDB {
  constructor() {
    this.client;
  }

  async save(category) {
    const categoryExist = await this.getByDescription(category.description);
    if (categoryExist != null) {
      throw new Error("Categoria já cadastrada");
    }

    this.client = await getConnection();

    try {
      const response = await this.client.query(
        `INSERT INTO \"CATEGORY\" (description) VALUES ('${category.description}') RETURNING *`
      );
      return response.rows[0];
    } catch (err) {
      throw new Error("Erro ao acessar db de categoria.", err);
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
      const categories = await this.client.query(
        `SELECT * FROM \"CATEGORY\" WHERE id = ${id}`
      );
      return categories.rows.length == 1 ? categories.rows[0] : categories.rows;
    } catch (err) {
      throw new Error("Erro ao buscar item do banco de dados");
    } finally {
      this.client.end();
    }
  }

  async getByDescription(description) {
    if (description === undefined || description.length < 3) {
      throw new Error("Descrição inválida");
    }

    this.client = await getConnection();
    try {
      const categories = await this.client.query(
        `SELECT * FROM \"CATEGORY\" WHERE description = '${description}'`
      );
      return categories.rows.length == 1 ? categories.rows[0] : null;
    } catch (err) {
      throw new Error("Erro ao buscar item do banco de dados");
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
      const categories = await this.client.query(
        `DELETE FROM \"CATEGORY\" WHERE id = ${id} RETURNING *`
      );
      return categories.rows.length == 1;
    } catch (err) {
      throw new Error("Erro ao buscar categorias no banco de dados.", err);
    } finally {
      this.client.end();
    }
  }
  async getList() {
    this.client = await getConnection();
    try {
      const categories = await this.client.query(`SELECT * FROM \"CATEGORY\"`);
      return categories.rows;
    } catch (err) {
      throw new Error("Erro ao buscar categorias no banco de dados.", err);
    } finally {
      this.client.end();
    }
  }

  async update(category) {
    if (!category.id) {
      throw new Error("O id é obrigatório para realização do update");
    }
    this.client = await getConnection();
    try {
      const response = await this.client.query(
        `UPDATE \"CATEGORY\" SET description = '${category.description}' where id = ${category.id} RETURNING *`
      );
      return response.rows[0];
    } catch (err) {
      throw new Error("Erro ao acessar db de categoria.", err);
    } finally {
      this.client.end();
    }
  }
}

module.exports = CategoryDB;
